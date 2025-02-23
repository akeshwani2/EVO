"use client";

import { Star, Brain, Zap, MousePointerClickIcon, Dot } from "lucide-react";
import { useMutation } from "convex/react";
import { api } from "../../../convex/_generated/api";
import { useNavigation } from "@/lib/context/navigation";
import { useRouter } from "next/navigation";

export default function DashboardPage() {
  const createChat = useMutation(api.chats.createChat);
  const { isMobileNavOpen, closeMobileNav } = useNavigation();

  const router = useRouter();

  const handleNewChat = async () => {
    const chatId = await createChat({ title: "New Chat" });
    router.push(`/dashboard/chat/${chatId}`);
    closeMobileNav();
  };
  return (
    <div
      className={`flex-1 flex items-center justify-center h-screen bg-black tracking-tight overflow-hidden fixed inset-0 ${
        !isMobileNavOpen ? "md:ml-[260px]" : ""
      }`}
    >
      <div className="w-full max-w-4xl px-4 scale-[0.85] md:scale-100">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 border border-white/60 rounded-lg p-6 md:p-8">
          {/* Left section - Welcome */}
          <div className="space-y-4 md:space-y-6">
            <div className=" flex items-center text-xs md:text-sm text-zinc-500 border border-white/20 rounded-lg max-w-fit px-2 py-1">
              <Dot className="w-4 h-4 animate-pulse text-red-500" />
              BETA
            </div>
            <div className="space-y-2">
              <h1 className="text-3xl md:text-4xl tracking-tighter text-white">
                Welcome to EVO
              </h1>
              <p className="text-base md:text-lg text-zinc-400 tracking-tight">
                Your AI agent for seamless productivity
              </p>
            </div>
            <div className="space-y-4">
              <p className="text-sm md:text-base text-zinc-500">
                Start a new conversation or continue where you left off. EVO is
                ready to assist you with any challenge.
              </p>
              <button
                className="w-full px-6 py-3 bg-white text-zinc-900 rounded-lg font-medium hover:bg-zinc-100 transition-colors flex items-center justify-center gap-2 hover:bg-zinc-300"
                onClick={handleNewChat}
              >
                <MousePointerClickIcon className="w-4 h-4" />
                Start New Chat
              </button>
            </div>
          </div>

          {/* Right section - Features */}
          <div className="grid grid-cols-1 gap-3 md:gap-4">
            <div className="p-6 rounded-xl bg-zinc-900/50 border border-zinc-800/50 backdrop-blur-sm hover:border-zinc-700/50 transition-colors">
              <div className="flex items-center gap-4">
                <div className="p-2 rounded-lg bg-white">
                  <Brain className="w-6 h-6 text-black" />
                </div>
                <div>
                  <h3 className="font-medium text-white">
                    Intelligent Responses
                  </h3>
                  <p className="text-sm text-zinc-400">
                    Advanced language understanding for precise assistance
                  </p>
                </div>
              </div>
            </div>

            <div className="p-6 rounded-xl bg-zinc-900/50 border border-zinc-800/50 backdrop-blur-sm hover:border-zinc-700/50 transition-colors">
              <div className="flex items-center gap-4">
                <div className="p-2 rounded-lg bg-white">
                  <Zap className="w-6 h-6 text-black" />
                </div>
                <div>
                  <h3 className="font-medium text-white">
                    Real-time Processing
                  </h3>
                  <p className="text-sm text-zinc-400">
                    Instant responses for seamless conversations
                  </p>
                </div>
              </div>
            </div>

            <div className="p-6 rounded-xl bg-zinc-900/50 border border-zinc-800/50 backdrop-blur-sm hover:border-zinc-700/50 transition-colors">
              <div className="flex items-center gap-4">
                <div className="p-2 rounded-lg bg-white">
                  <Star className="w-6 h-6 text-black" />
                </div>
                <div>
                  <h3 className="font-medium text-white">
                    Personalized Experience
                  </h3>
                  <p className="text-sm text-zinc-400">
                    Adapts to your needs and preferences
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
