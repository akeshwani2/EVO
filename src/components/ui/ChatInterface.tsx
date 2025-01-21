"use client";

import { useEffect, useRef, useState } from "react";
import { Doc } from "../../../convex/_generated/dataModel";
import { Button } from "@/components/ui/button";
import { Id } from "../../../convex/_generated/dataModel";
import { ArrowRightIcon } from "lucide-react";
import { ChatRequestBody, StreamMessageType } from "@/lib/types";
import { createSSEParser } from "@/lib/SSEParser";
import { getConvexClient } from "@/lib/convex";
import { api } from "../../../convex/_generated/api";
import { MessageBubble } from "./MessageBubble";

// Define a TypeScript interface that specifies what props the ChatInterface component accepts
interface ChatInterfaceProps {
  // chatId is a typed identifier for a specific chat
  // Id<"chats"> is a Convex type that ensures type safety for database IDs
  // It guarantees this ID specifically refers to a document in the "chats" collection
  chatId: Id<"chats">;

  // initialMessages is an array (indicated by []) of message documents
  // Doc<"messages"> is a Convex type that represents a document from the "messages" collection
  // It includes all fields and their types from your messages table/collection in Convex
  // For example, if a message has {text: string, timestamp: number}, Doc<"messages"> would include these
  initialMessages: Doc<"messages">[];
}

function ChatInterface({ chatId, initialMessages }: ChatInterfaceProps) {
  // So, this uses "messages" as a state variable to store the messages, and setMessages as a function to update the messages state
  // Doc<"messages"> is a Convex type that represents a single message document from your database
  // [] makes it an array of message documents
  // The whole type Doc<"messages">[] means like "an array of message documents"
  const [messages, setMessages] = useState<Doc<"messages">[]>(initialMessages); //This sets the initial value of the state to the initialMessages prop that was passed to the component
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [streamedResponse, setStreamedResponse] = useState("");

  //   very important, used to track when a specific tool is being used in the chatinterface
  const [currentTool, setCurrentTool] = useState<{
    name: string;
    input: unknown;
  } | null>(null);
  //   used to scroll to the bottom of the chat when a new message is added, so we'd use the ref and assign it to the last message in the chat
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const formatToolOutput = (output: unknown): string => {
    if (typeof output === "string") return output;
    return JSON.stringify(output, null, 2);
  };

  const formatTerminalOutput = (
    tool: string,
    input: unknown,
    output: unknown
  ): string => {
    const terminalHtml = `<div class="bg-[#1e1e1e] text-white font-mono p-2 rounded-md my-2 overflow-x-auto whitespace-normal max-w-[600px]">
      <div class="flex items-center gap-1.5 border-b border-gray-700 pb-1">
        <span class="text-red-500">●</span>
        <span class="text-yellow-500">●</span>
        <span class="text-green-500">●</span>
        <span class="text-gray-400 ml-1 text-sm">~/${tool}</span>
      </div>
      <div class="text-gray-400 mt-1">$ Input</div>
      <pre class="text-yellow-400 mt-0.5 whitespace-pre-wrap overflow-x-auto">${formatToolOutput(input)}</pre>
      <div class="text-gray-400 mt-2">$ Output</div>
      <pre class="text-green-400 mt-0.5 whitespace-pre-wrap overflow-x-auto">${formatToolOutput(output)}</pre>
    </div>`;

    return `---START---\n${terminalHtml}\n---END---`;
  };

  const processStream = async (
    reader: ReadableStreamDefaultReader<Uint8Array>,
    onChunk: (chunk: string) => Promise<void>
  ): Promise<void> => {
    try {
      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        await onChunk(new TextDecoder().decode(value));
      }
    } finally {
      reader.releaseLock();
    }
  };

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, streamedResponse]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const trimmedInput = input.trim();
    if (!trimmedInput || isLoading) return;
    // This will reset the UI state for a new message
    setInput("");
    setStreamedResponse("");
    setCurrentTool(null);
    setIsLoading(true);

    // So, here we will add user's message immediately, stricly for UX/UI purposes just looks cleaner type shi
    const optimisticMessage: Doc<"messages"> = {
      _id: `temp-${Date.now()}`,
      chatId,
      content: trimmedInput,
      role: "user",
      createdAt: Date.now(),
    } as Doc<"messages">;

    setMessages((prev) => [...prev, optimisticMessage]);

    // track comp;ete response for saving to db
    let fullResponse = "";

    // track streamed response for updating UI
    try {
      const requestBody: ChatRequestBody = {
        messages: messages.map((msg) => ({
          role: msg.role,
          content: msg.content,
        })),
        newMessage: trimmedInput,
        chatId,
      };

      // initialize the SSE (Server-Sent Events) connection, basically a way to push real-time updates to the client
      const response = await fetch("/api/chat/stream", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(requestBody),
      });

      if (!response.ok) {
        throw new Error(await response.text());
      }
      if (!response.body) throw new Error("No response body");
      // handle the streamed response

      const parser = createSSEParser();
      const reader = response.body.getReader();

      await processStream(reader, async (chunk) => {
        // Parse SSE messages from the chunk
        const messages = parser.parse(chunk);

        // Handle each message based on its type
        for (const message of messages) {
          switch (message.type) {
            case StreamMessageType.Token:
              // Handle streaming tokens (normal text response)
              if ("token" in message) {
                fullResponse += message.token;
                setStreamedResponse(fullResponse);
              }
              break;

            case StreamMessageType.ToolStart:
              // Handle start of tool execution (e.g. API calls, file operations)
              if ("tool" in message) {
                setCurrentTool({
                  name: message.tool,
                  input: message.input,
                });
                fullResponse += formatTerminalOutput(
                  message.tool,
                  message.input,
                  "Processing..."
                );
                setStreamedResponse(fullResponse);
              }
              break;

            case StreamMessageType.ToolEnd:
              // Handle completion of tool execution
              if ("tool" in message && currentTool) {
                // Replace the "Processing..." message with actual output
                const lastTerminalIndex = fullResponse.lastIndexOf(
                  '<div class="bg-[#1e1e1e]'
                );
                if (lastTerminalIndex !== -1) {
                  fullResponse =
                    fullResponse.substring(0, lastTerminalIndex) +
                    formatTerminalOutput(
                      message.tool,
                      currentTool.input,
                      message.output
                    );
                  setStreamedResponse(fullResponse);
                }
                setCurrentTool(null);
              }
              break;

            case StreamMessageType.Error:
              // Handle error messages from the stream
              if ("error" in message) {
                throw new Error(message.error);
              }
              break;

            case StreamMessageType.Done:
              // Handle completion of the entire response
              const assistantMessage: Doc<"messages"> = {
                _id: `temp_assistant_${Date.now()}`,
                chatId,
                content: fullResponse,
                role: "assistant",
                createdAt: Date.now(),
              } as Doc<"messages">;

              // Save the complete message to the database
              const convex = getConvexClient();
              await convex.mutation(api.messages.store, {
                chatId,
                content: fullResponse,
                role: "assistant",
              });

              setMessages((prev) => [...prev, assistantMessage]);
              setStreamedResponse("");
              setIsLoading(false);
              return;
          }
        }
      });
    } catch (error) {
      // handle any errors during streaming
      console.error("Error sending message:", error);
      // remove the optimistic message from the UI if there's an error
      setMessages((prev) =>
        prev.filter((msg) => msg._id !== optimisticMessage._id)
      );
      setStreamedResponse(
        formatTerminalOutput(
          "error",
          "Failed to send message. Please try again.",
          error instanceof Error ? error.message : "Unknown error"
        )
      );
      setIsLoading(false);
    }
  };

  return (
    <main className="flex flex-col h-[calc(100vh-theme(spacing.16))]">
      {/* Messages */}
      <section className="flex-1 overflow-y-auto p-2 md:p-0">
        <div className="max-w-4xl mx-auto p-4 space-y-3">
          {/* messages */}
          {messages?.map((message: Doc<"messages">) => (
            <MessageBubble
              key={message._id}
              content={message.content}
              isUser={message.role === "user"}
            />
          ))}
          {streamedResponse && <MessageBubble content={streamedResponse} />}
          {/* loading indicator */}
          {isLoading && !streamedResponse && (
            <div className="flex justify-start animate-in fade-in-0">
              <div className="rounded-2xl px-4 py-3 bg-white text-gray-900 rounded-bl-none shadow-sm ring-1 ring-inset ring-gray-200">
                <div className="flex items-center gap-1.5">
                  {[0.3, 0.15, 0].map((delay, i) => (
                    <div
                      key={i}
                      className="h-1.5 w-1.5 rounded-full bg-gray-400 animate-bounce"
                      style={{ animationDelay: `-${delay}s` }}
                    />
                  ))}
                </div>
              </div>
            </div>
          )}
          
          {/* last message */}
          <div ref={messagesEndRef} />
        </div>
      </section>

      {/* Footer input */}
      <footer className="border-t border-white/40 sticky bottom-0 px-4 pt-2 pb-2">
        <form onSubmit={handleSubmit} className="mx-auto relative">
          <div className="relative flex items-center">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="What's Up, EVO?"
              className="flex-1 py-3 px-4 tracking-tighter rounded-2xl focus:outline-none focus:ring-white focus:border focus:border-white/40 pr-12 bg-zinc-800 placeholder:text-zinc-500 text-white"
              disabled={isLoading}
            />
            <Button
              type="submit"
              // So, the button gets disabled if one of two conditions is true:
              // 1. isLoading is true, which means the button is currently processing a request
              // 2. input.trim() is false, which means the input is empty or only contains whitespace
              disabled={isLoading || !input.trim()}
              className={`absolute right-1.5 rounded-xl h-9 w-9 p-0 items-center justify-center transiton-all ${
                input.trim()
                  ? "bg-white text-black hover:bg-white/90"
                  : "bg-zinc-800 text-white hover:bg-zinc-800/90"
              }`}
            >
              <ArrowRightIcon className="h-5 w-5" />
            </Button>
          </div>
        </form>
      </footer>
    </main>
  );
}

export default ChatInterface;
