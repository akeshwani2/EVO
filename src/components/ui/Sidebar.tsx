"use client";

import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { PlusIcon } from "@radix-ui/react-icons";
import { cn } from "@/lib/utils";
import { useNavigation } from "@/lib/context/navigation";
import { useMutation, useQuery } from "convex/react";
import { api } from "../../../convex/_generated/api";
import { Id } from "../../../convex/_generated/dataModel";
import ChatRow from "@/components/ui/ChatRow"
export default function Sidebar() {
  const router = useRouter();
  const { isMobileNavOpen, closeMobileNav } = useNavigation();
  const createChat = useMutation(api.chats.createChat); // This is a mutation that lets us create a new chat.
  const deleteChat = useMutation(api.chats.deletChat) // This is a mutation that lets us delete a chat.

  const chats = useQuery(api.chats.listChats);
  const handleClick = () => {
    closeMobileNav();
  };
  const handleNewChat = async () => {
    const chatId = await createChat({ title: "New Chat" });
    router.push(`/dashboard/chat/${chatId}`);
    closeMobileNav();
  }

  const handleDeleteChat = async (id: Id<"chats"> ) => {
    await deleteChat({id});

    if (window.location.pathname.includes(id)) {
      router.push("/dashboard");
    }
  }
  return (
    <>
      {/* Background Overlay for mobile */}
      {isMobileNavOpen && (
        <div
          className="fixed inset-0 bg-black/20 z-40 md:hidden"
          onClick={closeMobileNav}
        />
      )}

      <div
        className={cn(
          "fixed md:inset-y-0 top-14 bottom-0 left-0 z-50 w-72 bg-zinc-900/80 backdrop-blur-xl border-r border-white/5 transform transition-transform duration-300 ease-in-out md:relative md:translate-x-0 md:top-0 flex flex-col",
          isMobileNavOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        <div className="p-4 border-b border-white/5">
          <Button
            onClick={handleNewChat}
            className="w-full bg-zinc-800 hover:bg-zinc-700 text-gray-200 border border-white/5 shadow-sm hover:shadow transition-all duration-200"
          >
            <PlusIcon className="mr-2 h-4 w-4" /> New Chat
          </Button>
        </div>

        <div className="flex-1 overflow-y-auto space-y-2.5 p-4 scrollbar-thin scrollbar-thumb-gray-200 scrollbar-track-transparent">
          {chats?.map((chat) => (
            <ChatRow key={chat._id} chat={chat} onDelete={handleDeleteChat}/>
          ))}
        </div>
      </div>
    </>
  );
}
  