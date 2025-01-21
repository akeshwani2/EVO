import { ArrowLeft, Workflow, Database, Shield, Cpu, MessageSquare, Wrench } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const ArchitecturePage = () => {
  return (
    <main className="min-h-screen bg-black px-6 md:px-8 py-16">
      {/* Header */}
      <div className="max-w-5xl mx-auto mb-16">
        <div className="flex items-center gap-2 mb-6">
          <Link href="/docs">
            <Button className="flex items-center gap-2 text-white">
              <ArrowLeft />
              Back to Docs
            </Button>
          </Link>
        </div>
        <h1 className="text-4xl font-medium text-white mb-4">
          System Architecture
        </h1>
        <p className="text-gray-400 text-lg">
          Understanding how EVO works under the hood
        </p>
      </div>

      {/* Core Components Section */}
      <div className="max-w-5xl mx-auto mb-16">
        <h2 className="text-2xl font-medium text-white mb-6">Core Components</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-zinc-900 rounded-lg p-6">
            <div className="flex items-center gap-3 mb-4">
              <Workflow className="w-6 h-6 text-white" />
              <h3 className="text-lg font-medium text-white">LangGraph Pipeline</h3>
            </div>
            <p className="text-gray-400 mb-4">
              Message processing workflow using LangGraph for orchestration:
            </p>
            <ul className="space-y-2 text-gray-400 list-disc pl-6">
              <li>State management for conversation context</li>
              <li>Conditional routing between agent and tools</li>
              <li>Streaming response generation</li>
              <li>Tool execution coordination</li>
            </ul>
          </div>

          <div className="bg-zinc-900 rounded-lg p-6">
            <div className="flex items-center gap-3 mb-4">
              <Database className="w-6 h-6 text-white" />
              <h3 className="text-lg font-medium text-white">Convex Database</h3>
            </div>
            <p className="text-gray-400 mb-4">
              Real-time database system handling:
            </p>
            <ul className="space-y-2 text-gray-400 list-disc pl-6">
              <li>Chat history persistence</li>
              <li>User data management</li>
              <li>Message synchronization</li>
              <li>Automatic caching and indexing</li>
            </ul>
          </div>
        </div>
      </div>

      {/* System Flow */}
      <div className="max-w-5xl mx-auto mb-16">
        <h2 className="text-2xl font-medium text-white mb-6">System Flow</h2>
        <div className="bg-zinc-900 rounded-lg p-8">
          <div className="space-y-8">
            <div className="flex items-start gap-4">
              <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center flex-shrink-0">
                <MessageSquare className="w-4 h-4 text-white" />
              </div>
              <div>
                <h4 className="text-white font-medium mb-2">1. Message Processing</h4>
                <p className="text-gray-400">
                  User messages are received through the Next.js API route, authenticated, 
                  and streamed to the LangGraph pipeline for processing.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center flex-shrink-0">
                <Cpu className="w-4 h-4 text-white" />
              </div>
              <div>
                <h4 className="text-white font-medium mb-2">2. Agent Evaluation</h4>
                <p className="text-gray-400">
                  The LangGraph agent evaluates the message context and determines whether to 
                  respond directly or utilize available tools.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center flex-shrink-0">
                <Wrench className="w-4 h-4 text-white" />
              </div>
              <div>
                <h4 className="text-white font-medium mb-2">3. Tool Integration</h4>
                <p className="text-gray-400">
                  When needed, the agent interfaces with external tools through GraphQL queries, 
                  including YouTube transcripts, Google Books, Wikipedia, and mathematical computations.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center flex-shrink-0">
                <Shield className="w-4 h-4 text-white" />
              </div>
              <div>
                <h4 className="text-white font-medium mb-2">4. Security & Storage</h4>
                <p className="text-gray-400">
                  All interactions are secured through Clerk authentication, with conversation 
                  history stored in Convex for real-time access and persistence.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Technical Stack */}
      <div className="max-w-5xl mx-auto">
        <h2 className="text-2xl font-medium text-white mb-6">Technical Stack</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-zinc-900 rounded-lg p-6">
            <h3 className="text-lg font-medium text-white mb-3">Frontend</h3>
            <ul className="space-y-2 text-gray-400">
              <li>• Next.js 15.1.5</li>
              <li>• React 19</li>
              <li>• TailwindCSS</li>
              <li>• Lucide Icons</li>
            </ul>
          </div>

          <div className="bg-zinc-900 rounded-lg p-6">
            <h3 className="text-lg font-medium text-white mb-3">Backend</h3>
            <ul className="space-y-2 text-gray-400">
              <li>• Convex Database</li>
              <li>• LangGraph</li>
              <li>• GraphQL Tools</li>
              <li>• Clerk Authentication</li>
            </ul>
          </div>

          <div className="bg-zinc-900 rounded-lg p-6">
            <h3 className="text-lg font-medium text-white mb-3">External Services</h3>
            <ul className="space-y-2 text-gray-400">
              <li>• YouTube API</li>
              <li>• Google Books API</li>
              <li>• Wikipedia API</li>
              <li>• Weather API</li>
            </ul>
          </div>
        </div>
      </div>
    </main>
  );
};

export default ArchitecturePage;