import { useNavigation } from "@/lib/context/navigation";
import { Doc, Id } from "../../../convex/_generated/dataModel";
import { useRouter } from "next/navigation";
import { Trash } from "lucide-react";
import { Button } from "./button";

function ChatRow({
    chat,
    onDelete,
}: {
    chat: Doc<"chats">;
    onDelete: (id: Id<"chats">) => Promise<void>;
}) {
    const router = useRouter();
    const { closeMobileNav } = useNavigation();
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
        <div className="text-white border flex items-center justify-between border-white/40 tracking-tight rounded-lg px-4 py-2 hover:bg-white/10 cursor-pointer group" onClick={handleClick}>
            <p className="text-md">{chat.title}</p>
            <Button 
                variant="ghost" 
                size="icon" 
                onClick={handleDelete}
                className="hover:white hover:text-black"
            >
                <Trash className="w-2 h-2 md:opacity-0 md:group-hover:opacity-100 cursor-pointer" />
            </Button>
        </div>
    )
    
}
export default ChatRow
