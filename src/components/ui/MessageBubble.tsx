"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useUser } from "@clerk/nextjs";
import { formatTerminalOutput } from "@/lib/utils";


interface MessageBubbleProps {
  content: string;
  isUser?: boolean;
}

const formatMessage = (content: string): string => {
  // First unescape backslashes
  content = content.replace(/\\\\/g, "\\");

  // Then handle newlines
  content = content.replace(/\\n/g, "\n");

  // Remove only the markers but keep the content between them
  content = content.replace(/---START---\n?/g, "").replace(/\n?---END---/g, "");

  // Trim any extra whitespace that might be left
  return content.trim();
};

export function MessageBubble({ content, isUser }: MessageBubbleProps) {
  const { user } = useUser();

  const formatTextContent = (text: string) => {
    // Convert line breaks to paragraphs and preserve whitespace
    return text
      .split('\n')
      .map(line => line.trim())
      .filter(line => line.length > 0)
      .map(line => `<p class="mb-2 last:mb-0">${line}</p>`)
      .join('');
  };

  const processContent = (content: string) => {
    content = formatMessage(content);
    const codeBlockRegex = /```(\w+)?\n([\s\S]*?)```/g;
    
    let lastIndex = 0;
    const parts = [];
    let match;

    while ((match = codeBlockRegex.exec(content)) !== null) {
      // Format text before code block
      if (match.index > lastIndex) {
        const textContent = content.slice(lastIndex, match.index);
        parts.push(formatTextContent(textContent));
      }

      // Extract language and code
      const language = match[1] || 'text';
      const code = match[2].trim();

      // Format code block
      const terminalHtml = `<div class="bg-gradient-to-br from-zinc-900 to-zinc-950 text-white font-mono p-4 rounded-xl my-4 overflow-x-auto whitespace-normal max-w-[600px] shadow-lg border border-zinc-800/50">
        <div class="flex items-center justify-between border-b border-zinc-800/80 pb-2 mb-3">
          <div class="flex items-center gap-2">
            <div class="flex gap-1.5">
              <span class="h-2.5 w-2.5 rounded-full bg-red-500/80 shadow-lg shadow-red-500/20"></span>
              <span class="h-2.5 w-2.5 rounded-full bg-yellow-500/80 shadow-lg shadow-yellow-500/20"></span>
              <span class="h-2.5 w-2.5 rounded-full bg-green-500/80 shadow-lg shadow-green-500/20"></span>
            </div>
            <span class="text-zinc-400 text-xs font-medium ml-2">code</span>
          </div>
          <span class="px-2 py-0.5 text-[10px] font-medium bg-zinc-800/50 rounded-full text-zinc-400 uppercase tracking-wider">${language}</span>
        </div>
        <div class="space-y-1.5">
          <pre class="text-emerald-300/90 text-sm whitespace-pre-wrap overflow-x-auto">${code}</pre>
        </div>
      </div>`;

      parts.push(terminalHtml);
      lastIndex = match.index + match[0].length;
    }

    // Format remaining text after last code block
    if (lastIndex < content.length) {
      const textContent = content.slice(lastIndex);
      parts.push(formatTextContent(textContent));
    }

    return parts.join('\n');
  };

  const processedContent = processContent(content);

  return (
    <div className={`flex ${isUser ? "justify-end" : "justify-start"} animate-in fade-in-0`}>
      <div
        className={`rounded-2xl px-4 py-3 max-w-[85%] ${
          isUser
            ? "bg-white text-black rounded-br-none"
            : "bg-zinc-800 text-white rounded-bl-none shadow-sm ring-1 ring-inset ring-white/20"
        }`}
        dangerouslySetInnerHTML={{ __html: processedContent }}
      />
    </div>
  );
}