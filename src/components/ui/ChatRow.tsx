import { useNavigation } from "@/lib/context/navigation";
import { Doc, Id } from "../../../convex/_generated/dataModel";
import { useRouter } from "next/navigation";
import { Trash } from "lucide-react";
import { Button } from "./button";
import { api } from "../../../convex/_generated/api";
import { useQuery } from "convex/react";
import TimeAgo from 'react-timeago';
import { cn } from "@/lib/utils";

interface ChatRowProps {
    chat: Doc<"chats">;
    onDelete: (id: Id<"chats">) => Promise<void>;
    isActive: boolean;
}

function ChatRow({
    chat,
    onDelete,
    isActive,
}: ChatRowProps) {
    const router = useRouter();
    const { closeMobileNav } = useNavigation();

    const lastMessage = useQuery(api.messages.getLastMessage, { chatId: chat._id });
    const handleClick = () => {
        router.push(`/dashboard/chat/${chat._id}`);
        closeMobileNav();
    }

    const handleDelete = async (e: React.MouseEvent) => {
        e.stopPropagation(); // Prevent event bubbling
        await onDelete(chat._id);
        closeMobileNav();
        router.push('/dashboard');
    };

    return (
        <div className={cn(
            "text-white border flex flex-row items-center justify-between border-white/40 tracking-tight rounded-lg px-4 py-2 hover:bg-white/10 cursor-pointer group",
            isActive && "bg-zinc-800/60"
        )} onClick={handleClick}>
            <div className="flex flex-col">
                <p className="text-sm text-white/70 truncate flex-1 font-medium truncate max-w-[200px]">
                    {lastMessage ? (
                        `${lastMessage.role === "user" ? "You: " : "AI: "}${lastMessage.content.replace(/\n/g, "\n")}`
                    ) : "New Conversation"}
                </p>
                {lastMessage && (
                    <p className="text-xs text-gray-500 mt-1.5 font-medium">
                        <TimeAgo date={lastMessage.createdAt} />
                    </p>
                )}
            </div>
            
            <Button 
                variant="ghost" 
                size="icon" 
                onClick={handleDelete}
                className="hover:white hover:text-black ml-2"
            >
                <Trash className="w-2 h-2 md:opacity-0 md:group-hover:opacity-100 cursor-pointer" />
            </Button>
        </div>
    )
}
export default ChatRow
