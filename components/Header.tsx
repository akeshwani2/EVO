import { Button } from "@/components/ui/button";
import { UserButton } from "@clerk/nextjs";
import { HamburgerMenuIcon } from "@radix-ui/react-icons";
import React from "react";

const Header = () => {
  return (
    <header className="border-b border-white bg-black text-white backdrop-blur-xl sticky top-0 z-50">
      <div className="flex items-center px-4 py-3">

        
        <div className="font-semibold bg-gradient-to-b from-white to-gray-500 bg-clip-text text-transparent">
          Chat with AXIS
        </div>
        
        <div className="flex-1" />
        <div className="px-4 py-2 flex items-center">
          <UserButton
            afterSignOutUrl="/"
            appearance={{
              elements: {
                avatarBox:
                  "h-8 w-8 ring-2 ring-gray-200/50 ring-offset-2 rounded-full transition-shadow hover:ring-gray-300",
              },
            }}
          />
        </div>
        </div>
    </header>
  );
};

export default Header;
