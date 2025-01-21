"use client";

import { UserButton } from "@clerk/nextjs";
import { Button } from "@/components/ui/button";
import { HamburgerMenuIcon } from "@radix-ui/react-icons";
import { useNavigation } from "@/lib/context/navigation";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function Header() {
  const { openMobileNav } = useNavigation();

  return (
    <header className=" pt-2 bg-black backdrop-blur-xl sticky top-0 z-50">
      <div className="flex items-center justify-between px-4 h-14">
        <div className="flex items-center gap-3">
          <Button
            variant="ghost"
            size="icon"
            onClick={openMobileNav}
            className="md:hidden text-gray-400 hover:text-gray-200 hover:bg-white/5"
          >
            <HamburgerMenuIcon className="h-5 w-5" />
          </Button>

        </div>
        <Link href="/">
        <div className="bg-gradient-to-b from-white to-gray-500 bg-clip-text text-transparent text-3xl border border-white/10 rounded-md px-2 py-1 hover:translate-y-1 transition-all duration-200 shadow-xl shadow-white/10 hover:shadow-white/20 hover:scale-105">
            EVO
          </div>
          </Link>
        <div className="flex items-center gap-6">
        {/* <Link href="/">
        <button className="group relative inline-flex items-center justify-center px-4 py-2 text-base font-medium text-black bg-white rounded-lg hover:from-gray-800 hover:to-gray-700 transition-all duration-200 shadow-lg hover:shadow-xl hover:-translate-y-0.5 tracking-tighter">
          Home
        </button>
        </Link> */}
        <div>
          <UserButton
            afterSignOutUrl="/"
            appearance={{
              elements: {
                avatarBox:
                  "h-10 w-10  rounded-md transition-shadow ring-2 ring-white/60",
              },
            }}
          />
        </div>
        </div>
      </div>
    </header>
  );
}
