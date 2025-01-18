import Image from "next/image";
import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/nextjs";
import { useAuth } from "@clerk/nextjs";
import { ArrowRight, ArrowRightCircle, ArrowUpRight, Dot, User } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { dark } from "@clerk/themes";
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
            <p className="text-md text-gray-400 max-w-[600px] md:text-lg/relaxed xl:text-2xl/relaxed tracking-tight">
              Meet EVO, an AI agent that goes beyond the ordinary
            </p>
            <Link href="https://wxflows.ibm.stepzen.com">
              <span className="text-gray-500 text-xs sm:text-sm md:text-base lg:text-lg xl:text-lg border border-gray-400 rounded-full py-1 px-3 flex items-center">
                <Dot className="w-8 h-8 text-white font-bold animate-pulse" />
                Powered by IBM&apos;s WxTools along with your favorite LLMs
              </span>
            </Link>
          </div>
        </header>

        {/* CTA Button */}
        <div className="flex items-center gap-4">
          <SignedIn>
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
          </SignedIn>
        </div>
        <div className="flex items-center gap-4">
          <SignedOut>
            <SignInButton
              mode="modal"
              fallbackRedirectUrl={"/dashboard"}
              forceRedirectUrl={"/dashboard"}
            >
              <button className="group relative inline-flex items-center justify-center px-4 py-3.5 text-base font-medium text-black bg-white rounded-lg hover:from-gray-800 hover:to-gray-700 transition-all duration-200 shadow-lg hover:shadow-xl hover:-translate-y-0.5 tracking-tighter">
                Sign Up
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
          </SignedOut>
        </div>

        {/* Features grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12 max-w-4xl mx-auto">
          {[
            {
              title: "Intelligent",
              description:
                "Lightning-quick responses powered by cutting-edge AI",
            },
            {
              title: "Intuitive",
              description: "Sleek interface with state-of-the-art capabilities",
            },
            {
              title: "Protected",
              description: "Enterprise-grade security for your peace of mind",
            },
          ].map(({ title, description }) => (
            <div
              key={title}
              className="text-center border border-gray-800 rounded-xl px-10 py-6"
            >
              <div className="text-3xl tracking-tighter bg-gradient-to-b from-white to-gray-500 bg-clip-text text-transparent">
                {title}
              </div>
              <div className="text-sm text-gray-600 mt-1">{description}</div>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
