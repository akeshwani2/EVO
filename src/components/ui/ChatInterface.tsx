"use client";

import { useEffect, useRef, useState } from "react";
import { Doc } from "../../../convex/_generated/dataModel";
import { Button } from "@/components/ui/button";
import { Id } from "../../../convex/_generated/dataModel";
import { ArrowRightIcon, SendIcon } from "lucide-react";
import { ChatRequestBody } from "@/lib/types";

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
            chatId
        }

        // initialize the SSE (Server-Sent Events) connection, basically a way to push real-time updates to the client
        const response = await fetch("/api/chat/stream", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(requestBody),
        });

        if (!response.ok) {
            throw new Error(await response.text());
        }
        if (!response.body) throw new Error("No response body");
        // handle the streamed response
        setIsLoading(false);

    } catch (error) {
        // handle any errors during streaming
        console.error("Error sending message:", error)
        // remove the optimistic message from the UI if there's an error
        setMessages((prev) => prev.filter((msg) => msg._id !== optimisticMessage._id));
        setStreamedResponse(
            "error"
            // formatTerminalOutput(
            //     "error",
            //     "Failed to send message. Please try again.",
            //     error instanceof Error ? error.message : "Unknown error"
            // )
        );
        setIsLoading(false);
    }

  };



  return (
    <main className="flex flex-col h-[calc(100vh-theme(spacing.14))]">
      {/* Messages */}
      <section className="flex-1">
        <div className="text-white">
            {/* messages */}
            {messages.map((message) => (
                <div key={message._id}>
                    {message.content}
                </div>
            ))}


          {/* last message */}
          <div ref={messagesEndRef}/>
        </div>
      </section>

      {/* Footer input */}
      <footer className="border-t border-white/40 p-4">
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
