import { getConvexClient } from "@/lib/convex";
import {
  ChatRequestBody,
  SSE_DATA_PREFIX,
  SSE_LINE_DELIMITER,
  StreamMessage,
  StreamMessageType,
} from "@/lib/types";
import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import { api } from "../../../../../convex/_generated/api";

function sendSSEMessage(
  writer: WritableStreamDefaultWriter<Uint8Array>, // The magic pencil that writes data to the stream
  data: StreamMessage // The message we want to send to the client
) {
  // Create a translator that converts text to computer-readable bytes
  const encoder = new TextEncoder();

  // Write the message to the stream in SSE format:
  // - SSE_DATA_PREFIX (usually "data: ") marks the start of each message
  // - JSON.stringify converts our data object to a text string
  // - SSE_LINE_DELIMITER (usually "\n\n") marks the end of each message
  return writer.write(
    encoder.encode(
      `${SSE_DATA_PREFIX}${JSON.stringify(data)}${SSE_LINE_DELIMITER}`
    )
  );
}

export async function POST(req: Request) {
  try {
    const { userId } = await auth();
    if (!userId) {
      return new Response("You're not supposed to be here", { status: 401 });
    }

    // extract the chat request body from the request
    const body = (await req.json()) as ChatRequestBody;
    const { messages, newMessage, chatId } = body;

    // initialize a convex client
    const convex = getConvexClient();

    // create a stream with larger queue stragtegy for better performacne
    const stream = new TransformStream({}, { highWaterMark: 1024 });
    const writer = stream.writable.getWriter(); // Allows us to write data to the stream

    const response = new Response(stream.readable, {
      headers: {
        "Content-Type": "text/event-stream", // SSE requires this header, it's a way to stream data to the client
        Connection: "keep-alive", // keep the connection open so we can send multiple events
        "X-Accel-Buffering": "no", // Disable buffering for nginx which is required for SSE to work properly
      },
    });

    const startStream = async () => {
      try {
        // STream will be implemented here
        // 1. we need to send an intiial connection message to front end saying we connected
        await sendSSEMessage(writer, { type: StreamMessageType.Connected });

        // Send user message to convex
        await convex.mutation(api.messages.send, {
          chatId,
          content: newMessage,
        });
      } catch (error) {
        console.error("Error in chat API:", error);
        return NextResponse.json(
          { error: "Failed to process chat request" } as const,
          { status: 500 }
        );
      }
    };

    startStream();
    return response;
  } catch (error) {
    console.error("Error in chat API:", error);
    return NextResponse.json({ error: "Internal server error" } as const, {
      status: 500,
    });
  }
}
