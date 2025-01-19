import { useNavigation } from "@/lib/context/navigation";
import { Doc, Id } from "../../../convex/_generated/dataModel";
import { useRouter } from "next/navigation";
import { Trash } from "lucide-react";

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
        router.push(`/chat/${chat._id}`);
        closeMobileNav();
    }

    const handleDelete = async (e: React.MouseEvent) => {
        e.stopPropagation(); // Prevent event bubbling
        await onDelete(chat._id);
        closeMobileNav();
        router.push('/dashboard');
    };

    return (
        <div className="text-white border flex items-center justify-between border-white/60 rounded-lg px-4 py-2 hover:bg-white/10 transition-colors cursor-pointer" onClick={handleClick}>
            <p>{chat.title}</p>
            <Trash 
                className="w-4 h-4 text-white/60 hover:text-white transition-colors cursor-pointer" 
                onClick={handleDelete} 
            />
        </div>
    )
}
export default ChatRow
