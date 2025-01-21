import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const formatTerminalOutput = (
  tool: string,
  input: unknown,
  output: unknown
): string => {
  // Special case for code examples - treat them as a "code" tool
  if (tool === "code") {
    const terminalHtml = `<div class="bg-gradient-to-br from-zinc-900 to-zinc-950 text-white font-mono p-4 rounded-xl my-3 overflow-x-auto whitespace-normal max-w-[600px] shadow-lg border border-zinc-800/50">
      <div class="flex items-center justify-between border-b border-zinc-800/80 pb-2 mb-3">
        <div class="flex items-center gap-2">
          <div class="flex gap-1.5">
            <span class="h-2.5 w-2.5 rounded-full bg-red-500/80 shadow-lg shadow-red-500/20"></span>
            <span class="h-2.5 w-2.5 rounded-full bg-yellow-500/80 shadow-lg shadow-yellow-500/20"></span>
            <span class="h-2.5 w-2.5 rounded-full bg-green-500/80 shadow-lg shadow-green-500/20"></span>
          </div>
          <span class="text-zinc-400 text-xs font-medium ml-2">code</span>
        </div>
        <span class="px-2 py-0.5 text-[10px] font-medium bg-zinc-800/50 rounded-full text-zinc-400 uppercase tracking-wider">${input}</span>
      </div>
      <div class="space-y-1.5">
        <pre class="text-emerald-300/90 text-sm whitespace-pre-wrap overflow-x-auto">${output}</pre>
      </div>
    </div>`;

    return `---START---\n${terminalHtml}\n---END---`;
  }

  // Original terminal output format for other tools
  const terminalHtml = `<div class="bg-gradient-to-br from-zinc-900 to-zinc-950 text-white font-mono p-4 rounded-xl my-3 overflow-x-auto whitespace-normal max-w-[600px] shadow-lg border border-zinc-800/50">
    <div class="flex items-center justify-between border-b border-zinc-800/80 pb-2 mb-3">
      <div class="flex items-center gap-2">
        <div class="flex gap-1.5">
          <span class="h-2.5 w-2.5 rounded-full bg-red-500/80 shadow-lg shadow-red-500/20"></span>
          <span class="h-2.5 w-2.5 rounded-full bg-yellow-500/80 shadow-lg shadow-yellow-500/20"></span>
          <span class="h-2.5 w-2.5 rounded-full bg-green-500/80 shadow-lg shadow-green-500/20"></span>
        </div>
        <span class="text-zinc-400 text-xs font-medium ml-2">${tool}</span>
      </div>
    </div>
    <div class="space-y-1.5">
      <pre class="text-emerald-300/90 text-sm whitespace-pre-wrap overflow-x-auto">${output}</pre>
    </div>
  </div>`;

  return `---START---\n${terminalHtml}\n---END---`;
};
