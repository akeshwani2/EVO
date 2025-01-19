export default function Loading() {
    // Generate random number between 2 and 6
    const numMessages = Math.floor(Math.random() * 5) + 2;
  
    return (
      <div className="flex-1 overflow-hidden bg-black">
        {/* Messages section */}
        <div className="h-[calc(100vh-65px)] flex flex-col">
          <div className="flex-1 overflow-y-auto p-4">
            <div className="max-w-4xl mx-auto space-y-8">
              {[...Array(numMessages)].map((_, i) => (
                <div
                  key={i}
                  className={`flex ${i % 2 === 0 ? "justify-end" : "justify-start"}`}
                >
                  <div
                    className={`w-2/3 rounded-2xl p-4 ${
                      i % 2 === 0
                        ? "bg-white/10 rounded-br-none"
                        : "bg-zinc-900 rounded-bl-none border border-zinc-800"
                    }`}
                  >
                    <div className="space-y-3">
                      <div
                        className={`h-4 animate-pulse rounded w-[90%] ${i % 2 === 0 ? "bg-white/20" : "bg-zinc-800"}`}
                      />
                      <div
                        className={`h-4 animate-pulse rounded w-[75%] ${i % 2 === 0 ? "bg-white/20" : "bg-zinc-800"}`}
                      />
                      <div
                        className={`h-4 animate-pulse rounded w-[60%] ${i % 2 === 0 ? "bg-white/20" : "bg-zinc-800"}`}
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
  
          {/* Input section */}
          <div className="border-t border-zinc-800 bg-black p-4">
            <div className="max-w-4xl mx-auto">
              <div className="h-12 bg-zinc-900 rounded-full animate-pulse" />
            </div>
          </div>
        </div>
      </div>
    );
  }