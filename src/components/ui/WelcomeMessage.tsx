export default function WelcomeMessage() {
  return (
    <main className="bg-gradient-to-b from-black via-gray-900 to-black relative overflow-hidden min-h-[500px]">
      {/* Animated background elements */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-grid-white/[0.02] -z-10 " />
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-blue-500/5 to-transparent animate-pulse-slow" />
        <div className="absolute h-full w-full bg-black [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]" />
      </div>

      {/* Content Container */}
      <div className="relative px-6 lg:px-8 py-24 max-w-6xl mx-auto">
        <div className="backdrop-blur-lg bg-zinc-900/40 rounded-3xl border border-white/10 overflow-hidden shadow-2xl">
          <div className="flex flex-col md:flex-row">
            {/* Left Section */}
            <div className="md:w-2/5 bg-gradient-to-br from-blue-600/10 via-purple-600/10 to-violet-600/10 p-10 flex flex-col justify-center relative">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 via-purple-500/20 to-violet-500/20 blur-3xl opacity-50" />
              <div className="relative">
                <h2 className="text-4xl font-bold tracking-tight text-white mb-6 bg-gradient-to-r from-white via-blue-100 to-blue-200 bg-clip-text text-transparent animate-gradient">
                 EVO
                </h2>
                <p className="text-gray-300 leading-relaxed text-lg">
                  Your intelligent assistant for research, analysis, and problem-solving.
                </p>
              </div>
            </div>

            {/* Right Section */}
            <div className="md:w-3/5 p-10 border-t md:border-t-0 md:border-l border-white/10 relative">
              <p className="text-gray-300 mb-8 text-lg">
                I can help you with:
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {[
                  "Finding and analyzing YouTube video transcripts",
                  "Searching through Google Books",
                  "Processing data with JSONata",
                  "Solving mathematical problems"
                ].map((item, index) => (
                  <div key={index} className="flex items-start gap-4 group">
                    <div className="h-2 w-2 rounded-full bg-white mt-2 group-hover:scale-125 transition-transform" />
                    <span className="text-gray-400 group-hover:text-gray-200 transition-colors">{item}</span>
                  </div>
                ))}
              </div>
              <p className="text-gray-400 mt-8 leading-relaxed border-t border-white/5 pt-8">
                Feel free to ask me anything! I&apos;m here to help.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Animation styles */}
      <style jsx global>{`
        @keyframes fade-in {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes fade-in-up {
          from { 
            opacity: 0;
            transform: translateY(20px);
          }
          to { 
            opacity: 1;
            transform: translateY(0);
          }
        }
        @keyframes gradient {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        @keyframes pulse-slow {
          0%, 100% { opacity: 0.1; }
          50% { opacity: 0.3; }
        }
        .animate-fade-in {
          animation: fade-in 1s ease-out;
        }
        .animate-fade-in-up {
          animation: fade-in-up 0.8s ease-out;
        }
        .animate-gradient {
          background-size: 200% auto;
          animation: gradient 8s linear infinite;
        }
        .animate-pulse-slow {
          animation: pulse-slow 4s ease-in-out infinite;
        }
      `}</style>
    </main>
  );
}