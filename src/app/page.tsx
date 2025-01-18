import Image from "next/image";
import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/nextjs";
import { useAuth } from "@clerk/nextjs";
import { ArrowRightCircle, ArrowUpRight, User } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { dark } from "@clerk/themes";
export default function Home() {
  return (
    <main className="min-h-screen bg-black flex items-center justify-center">
      <div className="absolute top-4 right-4">
        <UserButton />
      </div>
      <section className="w-full px-4 py-12 mx-auto max-w-7xl sm:px-6 lg:px-8 flex flex-col items-center gap-12">

        {/* Hero */}
        <header className="flex flex-col items-center gap-2">
          <h1 className="text-6xl tracking-tighter sm:text-7xl bg-gradient-to-b from-white to-gray-500 bg-clip-text text-transparent">
            AXIS
          </h1>
          <div className="flex flex-col items-center gap-2">
            {/* Description */}
            <p className="text-md text-gray-400 max-w-[600px] md:text-lg/relaxed xl:text-2xl/relaxed tracking-tight">
              Meet AXIS, an AI agent that goes beyond the ordinary
            </p>
            <Link href="https://wxflows.ibm.stepzen.com">
              <span className="text-gray-500 text-xs sm:text-sm md:text-base lg:text-lg xl:text-lg border border-gray-400 rounded-full py-1 px-4">
                Powered by IBM&apos;s WxTools along with your favorite LLMs
              </span>
            </Link>
          </div>
        </header>

        {/* Call to action */}
        <div className="flex flex-col items-center gap-4">
          <SignedIn>
            <div className="flex flex-row items-center gap-4">
              <Link href="/dashboard">
                <Button className="bg-white text-black px-4 py-2 rounded-md flex hover:bg-gray-200 items-center gap-2">
                  <span>Get Started</span>
                  <ArrowRightCircle className="w-4 h-4" />
                </Button>
              </Link>
              <Link href="/docs">
                <Button className="bg-white text-black px-4 py-2 rounded-md flex hover:bg-gray-200 items-center gap-2">
                  <span>Learn More</span>
                  <ArrowUpRight className="w-4 h-4" />
                </Button>
              </Link>
            </div>
          </SignedIn>
          <SignedOut>
          <div className="flex flex-row items-center gap-2">

            <SignInButton
              mode="modal"
              fallbackRedirectUrl="/dashboard"
              forceRedirectUrl={"/dashboard"}
            >
              <Button className="bg-white text-black px-4 py-2 rounded-md flex hover:bg-gray-200 items-center gap-2">
                <span>Get Started</span>
                <ArrowRightCircle className="w-4 h-4" />
              </Button>
            </SignInButton>
            <Link href="/docs">
                <Button className="bg-white text-black px-4 py-2 rounded-md flex hover:bg-gray-200 items-center gap-2">
                  <span>Learn More</span>
                  <ArrowUpRight className="w-4 h-4" />
                </Button>
              </Link>
            </div>
          </SignedOut>

          {/* Features */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-16 pt-8 max-w-3xl mx-auto">
            {[
              {
                title: "Intelligent",
                description:
                  "Lightning-quick responses powered by cutting-edge AI",
              },
              {
                title: "Intuitive",
                description:
                  "Sleek interface with state-of-the-art capabilities",
              },
              {
                title: "Protected",
                description: "Enterprise-grade security for your peace of mind",
              },
            ].map(({ title, description }) => (
              <div
                key={title}
                className="text-center border border-gray-800 rounded-xl px-4 py-4"
              >
                <div className="text-3xl tracking-tighter bg-gradient-to-b from-white to-gray-500 bg-clip-text text-transparent">
                  {title}
                </div>
                <div className="text-sm text-gray-600 mt-1">{description}</div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
