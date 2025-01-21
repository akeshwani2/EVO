import { Button } from "@/components/ui/button";
import React from "react";
import {
  ArrowLeft,
  Cpu,
  BookOpen,
  Code,
  Zap,
  Shield,
  BugOff,
  Layers,
  Brain,
} from "lucide-react";
import Link from "next/link";

const DocsPage = () => {
  return (
    <main className="min-h-screen bg-black px-6 md:px-8 py-16">
      {/* Header */}
      <div className="max-w-5xl mx-auto mb-16">
        <div className="flex items-center gap-2 mb-6">
          <Link href="/">
            <Button className="flex items-center gap-2 text-white">
              <ArrowLeft />
              Back
            </Button>
          </Link>
        </div>
        <h1 className="text-4xl font-medium text-white mb-4">Welcome to EVO</h1>
        <p className="text-gray-400 text-lg mb-8">
          EVO is my attempt at creating a general purpose AI agent. Though it is
          not perfect, it is a work in progress.
        </p>

        {/* Info Section */}
        <div className="bg-zinc-900 rounded-lg p-8 mb-12">
          <h2 className="text-2xl font-medium text-white mb-6">About EVO</h2>
          <div className="space-y-6 text-gray-400">
            <p>
              EVO is an advanced AI agent built with Next.js, Convex, and
              LangGraph. It processes messages through a sophisticated pipeline,
              leveraging various tools and APIs to provide intelligent
              responses.
            </p>
            <p>Key capabilities include:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>YouTube video transcription and analysis</li>
              <li>Google Books integration for literature queries</li>
              <li>Wikipedia information retrieval</li>
              <li>Mathematical computations and problem-solving</li>
              <li>Weather information access</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Feature Cards Grid */}
      <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
        <Link href="/docs/architecture">
          <div className="bg-zinc-900 rounded-lg p-6 hover:bg-zinc-800/80 transition-colors">
            <div className="mb-4">
              <Cpu className="w-8 h-8 text-white" />
            </div>
            <h2 className="text-xl font-medium text-white mb-2">
              Architecture
            </h2>
            <p className="text-gray-400">
              Understand EVO's technical architecture and workflow system.
            </p>
          </div>
        </Link>

        <Link href="/docs/caching">
          <div className="bg-zinc-900 rounded-lg p-6 hover:bg-zinc-800/80 transition-colors">
            <div className="mb-4">
              <Layers className="w-8 h-8 text-white" />
            </div>
            <h2 className="text-xl font-medium text-white mb-2">
              Prompt Caching
            </h2>
            <p className="text-gray-400">
              Learn how EVO caches prompts to improve response times.
            </p>
          </div>
        </Link>
        <Link href="https://wxflows.ibm.stepzen.com/?instance=fe8773c2-4192-48fa-8031-83e9c23d4f70&environment=banbakla">
          <div className="bg-zinc-900 rounded-lg p-6 hover:bg-zinc-800/80 transition-colors">
            <div className="mb-4">
              <Brain className="w-8 h-8 text-white" />
            </div>
            <h2 className="text-xl font-medium text-white mb-2">
              IBM&apos;s Watsonx.ai flows engine
            </h2>
            <p className="text-gray-400">
              Learn more about IBM&apos;s Watsonx.ai and try it yourself.
            </p>
          </div>
        </Link>
      </div>

      {/* Technical Details Section */}
      <div className="max-w-5xl mx-auto">
        <h2 className="text-2xl font-medium text-white mb-6">
          Technical Features
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-zinc-900 rounded-lg p-6">
            <h3 className="text-lg font-medium text-white mb-3">
              <Zap className="w-5 h-5 inline-block mr-2" />
              LangGraph Integration
            </h3>
            <p className="text-gray-400">
              Advanced language processing with state management and tool
              integration capabilities.
            </p>
          </div>

          <div className="bg-zinc-900 rounded-lg p-6">
            <h3 className="text-lg font-medium text-white mb-3">
              <Shield className="w-5 h-5 inline-block mr-2" />
              Secure Authentication
            </h3>
            <p className="text-gray-400">
              Built-in Clerk authentication with protected routes and user
              management.
            </p>
          </div>

          <div className="bg-zinc-900 rounded-lg p-6">
            <h3 className="text-lg font-medium text-white mb-3">
              <Cpu className="w-5 h-5 inline-block mr-2" />
              Convex Database
            </h3>
            <p className="text-gray-400">
              Real-time database with automatic caching and optimized queries
              for chat history.
            </p>
          </div>

          <div className="bg-zinc-900 rounded-lg p-6">
            <h3 className="text-lg font-medium text-white mb-3">
              <BookOpen className="w-5 h-5 inline-block mr-2" />
              External APIs
            </h3>
            <p className="text-gray-400">
              Integration with multiple external services including YouTube,
              Google Books, and Wikipedia.
            </p>
          </div>
        </div>
      </div>
    </main>
  );
};

export default DocsPage;
