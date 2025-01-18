import { BotIcon } from "lucide-react";

export default function DashboardPage() {
  return (
    <div className="flex-1 flex items-center justify-center p-4 bg-black">
      <div className="relative max-w-2xl w-full">
        <div className="relative space-y-8 p-8">
          {/* Hero section */}
          <div className="bg-zinc-900/50 backdrop-blur-sm border border-zinc-800 rounded-3xl p-8 space-y-6">
            <div className="flex justify-center">
              <div className="p-4 bg-zinc-800/50 rounded-2xl">
                <BotIcon className="w-12 h-12 text-white/80" />
              </div>
            </div>
            
            <div className="space-y-4 text-center">
              <h1 className="text-2xl font-medium text-white/90">
                Welcome to the AI Agent Chat
              </h1>
              <p className="text-zinc-400 max-w-md mx-auto">
                Start a new conversation or select an existing chat from the
                sidebar. Your AI assistant is ready to help with any task.
              </p>
            </div>

            <div className="flex justify-center gap-6 text-sm text-zinc-500">
              <div className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-white/20"></div>
                Real-time
              </div>
              <div className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-white/20"></div>
                Intelligent
              </div>
              <div className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-white/20"></div>
                Powerful
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
