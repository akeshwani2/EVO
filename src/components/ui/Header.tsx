"use client";

import { UserButton } from "@clerk/nextjs";
import { Button } from "@/components/ui/button";
import { HamburgerMenuIcon } from "@radix-ui/react-icons";
import { useNavigation } from "@/lib/context/navigation";
import Link from "next/link";

export default function Header() {
  const { openMobileNav } = useNavigation();

  return (
    <header className="border-b border-white/10 pt-3 bg-black backdrop-blur-xl sticky top-0 z-50 shadow-xl shadow-white/10">
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
        <h1 className="text-3xl font-bold tracking-tighter bg-gradient-to-r from-white via-gray-200 to-gray-400 bg-clip-text text-transparent animate-gradient px-1">
            EVO
          </h1>
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
