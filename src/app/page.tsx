import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/nextjs";
import { ArrowRight, ArrowUpRight, Dot } from "lucide-react";
import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-screen bg-black flex items-center justify-center">
      <div className="absolute top-4 right-4">
        <UserButton />
      </div>
      <section className="w-full px-4 py-12 mx-auto max-w-7xl sm:px-6 lg:px-8 flex flex-col items-center gap-8">
        {/* Hero */}
        <header className="flex flex-col items-center gap-4">
          <h1 className="text-6xl tracking-tighter sm:text-7xl bg-gradient-to-b from-white to-gray-500 bg-clip-text text-transparent">
            EVO
          </h1>
          <div className="flex flex-col items-center gap-4">
            {/* Description */}
            <p className="text-sm text-center text-gray-400 max-w-[600px] md:text-lg/relaxed xl:text-xl/relaxed tracking-tight">
              EVO is an AI agent that goes beyond the ordinary, it is your personal assistant that can help you with your daily tasks
            </p>
            <Link href="https://wxflows.ibm.stepzen.com">
              <span className="text-gray-500 text-sm text-center sm:text-sm md:text-base lg:text-md xl:text-md border border-gray-400 rounded-full py-1 px-3 flex items-center pl-1">
                <Dot className="w-8 h-8 text-white font-bold animate-pulse" />
                Powered by IBM&apos;s watsonx.ai
              </span>
            </Link>
          </div>
        </header>

        {/* CTA Buttons */}
        <div className="flex flex-col items-center gap-4">
          <SignedIn>
            <div className="flex items-center gap-4">
              <Link href="/dashboard">
                <button className="group relative inline-flex items-center justify-center px-4 py-3.5 text-base font-medium text-black bg-white rounded-lg hover:from-gray-800 hover:to-gray-700 transition-all duration-200 shadow-lg hover:shadow-xl hover:-translate-y-0.5 tracking-tighter">
                  Chat with EVO
                  <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-0.5" />
                  <div className="absolute inset-0 rounded-full bg-gradient-to-r from-gray-900/20 to-gray-800/20 blur-xl opacity-0 group-hover:opacity-100 transition-opacity" />
                </button>
              </Link>
              <Link href="/docs">
                <button className="group relative inline-flex items-center justify-center px-4 py-3.5 text-base font-medium text-black bg-white rounded-lg hover:from-gray-800 hover:to-gray-700 transition-all duration-200 shadow-lg hover:shadow-xl hover:-translate-y-0.5 tracking-tighter">
                  Learn More
                  <ArrowUpRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-0.5" />
                  <div className="absolute inset-0 rounded-full bg-gradient-to-r from-gray-900/20 to-gray-800/20 blur-xl opacity-0 group-hover:opacity-100 transition-opacity" />
                </button>
              </Link>
            </div>
          </SignedIn>
          <SignedOut>
            <div className="flex items-center gap-4">
              <SignInButton
                mode="modal"
                
                fallbackRedirectUrl={"/dashboard"}
                forceRedirectUrl={"/dashboard"}
              >
                <button className="group relative inline-flex items-center justify-center px-4 py-3.5 text-base font-medium text-black bg-white rounded-lg hover:from-gray-800 hover:to-gray-700 transition-all duration-200 shadow-lg hover:shadow-xl hover:-translate-y-0.5 tracking-tighter">
                  Try EVO
                  <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-0.5" />
                  <div className="absolute inset-0 rounded-full bg-gradient-to-r from-gray-900/20 to-gray-800/20 blur-xl opacity-0 group-hover:opacity-100 transition-opacity" />
                </button>
              </SignInButton>
              <Link href="/docs">
                <button className="group relative inline-flex items-center justify-center px-4 py-3.5 text-base font-medium text-black bg-white rounded-lg hover:from-gray-800 hover:to-gray-700 transition-all duration-200 shadow-lg hover:shadow-xl hover:-translate-y-0.5 tracking-tighter">
                  Learn More
                  <ArrowUpRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-0.5" />
                  <div className="absolute inset-0 rounded-full bg-gradient-to-r from-gray-900/20 to-gray-800/20 blur-xl opacity-0 group-hover:opacity-100 transition-opacity" />
                </button>
              </Link>
            </div>
          </SignedOut>
        </div>

        {/* Features grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12 max-w-4xl mx-auto">
          {[
            {
              title: "YouTube",
              description:
                "Extract detailed transcripts from any YouTube video with precise timestamps",
            },
            {
              title: "And More",
              description: 
                "Explore additional tools including Wikipedia, Google Books, and social data analysis",
            },
          ].map(({ title, description }) => (
            <div
              key={title}
              className="relative text-center border border-gray-800/50 rounded-xl px-8 py-8 bg-gradient-to-b from-gray-900/50 to-transparent backdrop-blur-sm hover:border-gray-700/50 transition-all duration-300 group"
            >
              <div className="absolute inset-0 bg-gradient-to-b from-gray-500/5 to-transparent rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <div className="relative">
                <div className="text-2xl font-medium tracking-tight bg-gradient-to-b from-white to-gray-400 bg-clip-text text-transparent mb-3">
                  {title}
                </div>
                <div className="text-sm text-gray-500 leading-relaxed">{description}</div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
