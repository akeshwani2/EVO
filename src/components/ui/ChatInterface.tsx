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
    const terminalHtml = `<div class="bg-gradient-to-br from-zinc-900 to-zinc-950 text-white font-mono p-4 rounded-xl my-3 overflow-x-auto whitespace-normal max-w-[600px] shadow-lg border border-zinc-800/50">
      <div class="flex items-center justify-between border-b border-zinc-800/80 pb-2 mb-3">
        <div class="flex items-center gap-2">
          <div class="flex gap-1.5">
            <span class="h-2.5 w-2.5 rounded-full bg-red-500/80 shadow-lg shadow-red-500/20"></span>
            <span class="h-2.5 w-2.5 rounded-full bg-yellow-500/80 shadow-lg shadow-yellow-500/20"></span>
            <span class="h-2.5 w-2.5 rounded-full bg-green-500/80 shadow-lg shadow-green-500/20"></span>
          </div>
          <span class="text-zinc-400 text-xs font-medium ml-2">evo@terminal</span>
        </div>
        <span class="px-2 py-0.5 text-[10px] font-medium bg-zinc-800/50 rounded-full text-zinc-400 uppercase tracking-wider">${tool}</span>
      </div>
      <div class="space-y-4">
        <div class="space-y-1.5">
          <div class="flex items-center gap-2">
            <span class="text-teal-500/90">❯</span>
            <span class="text-zinc-400 text-sm">Input</span>
          </div>
          <pre class="text-yellow-300/90 text-sm pl-4 whitespace-pre-wrap overflow-x-auto">${formatToolOutput(input)}</pre>
        </div>
        <div class="space-y-1.5">
          <div class="flex items-center gap-2">
            <span class="text-teal-500/90">❯</span>
            <span class="text-zinc-400 text-sm">Output</span>
          </div>
          <pre class="text-emerald-300/90 text-sm pl-4 whitespace-pre-wrap overflow-x-auto">${formatToolOutput(output)}</pre>
        </div>
      </div>
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
              <div className="rounded-2xl px-3 py-2 bg-zinc-800 text-white rounded-bl-none shadow-sm ring-1 ring-inset ring-white/20">
              <span className="animate-slide-right tracking-tighter text-md bg-gradient-to-b from-white to-gray-500 bg-clip-text text-transparent">EVO</span>
              </div>
            </div>
          )}
          
          {/* last message */}
          <div ref={messagesEndRef} />
        </div>
      </section>

      {/* Footer input */}
      <footer className="border-t border-white/20 sticky bottom-0 p-4">
        <form onSubmit={handleSubmit} className="mx-auto max-w-4xl relative">
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
