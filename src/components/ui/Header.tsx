"use client";

import { UserButton } from "@clerk/nextjs";
import { Button } from "@/components/ui/button";
import { HamburgerMenuIcon } from "@radix-ui/react-icons";
import { useNavigation } from "@/lib/context/navigation";

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
          <div className="font-semibold text-white text-lg">
            
          </div>
        </div>
        <div className="flex items-center">
          <UserButton
            afterSignOutUrl="/"
            appearance={{
              elements: {
                avatarBox:
                  "h-10 w-10 ring-2 ring-gray-200/50 ring-offset-2 rounded-md transition-shadow hover:ring-gray-300/50",
              },
            }}
          />
        </div>
      </div>
    </header>
  );
}
