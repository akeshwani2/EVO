import { Button } from "@/components/ui/button";
import React from "react";
import { ArrowLeft } from "lucide-react";
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
              
            </Button>
          </Link>
        </div>
        <h1 className="text-4xl font-medium text-white mb-4">
          Welcome to EVO
        </h1>
        <p className="text-gray-400 text-lg mb-8">
          Find all the guides and resources you need to build with EVO AI Agent.
        </p>
        
        {/* Info Section */}
        <div className="bg-zinc-900 rounded-lg p-8 mb-12">
          <h2 className="text-2xl font-medium text-white mb-6">How EVO Works</h2>
          <div className="space-y-6 text-gray-400">
            <p>
              EVO is an AI agent that processes messages through a sophisticated pipeline. When it receives 
              a message, it determines the appropriate actions to take based on predefined access patterns and context.
            </p>
            <p>
              For example, when you send a YouTube video link, EVO automatically:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Extracts the video's transcription</li>
              <li>Processes and analyzes the content</li>
              <li>Stores relevant information in the Convex database</li>
              <li>Provides intelligent responses based on the video context</li>
            </ul>
            <p>
              The system uses prompt caching to optimize performance and reduce costs, while maintaining 
              high-quality responses through advanced LLM capabilities.
            </p>
          </div>
        </div>
      </div>

      {/* Feature Cards Grid */}
      <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
        <div className="bg-zinc-900 rounded-lg p-6 hover:bg-zinc-800/80 transition-colors">
          <div className="mb-4">
            <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
          </div>
          <h2 className="text-xl font-medium text-white mb-2">Quick Start</h2>
          <p className="text-gray-400">
            Learn how to integrate and start using EVO AI Agent in your applications.
          </p>
        </div>

        <div className="bg-zinc-900 rounded-lg p-6 hover:bg-zinc-800/80 transition-colors">
          <div className="mb-4">
            <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 7v10c0 2 1 3 3 3h10c2 0 3-1 3-3V7c0-2-1-3-3-3H7c-2 0-3 1-3 3z" />
            </svg>
          </div>
          <h2 className="text-xl font-medium text-white mb-2">Architecture</h2>
          <p className="text-gray-400">
            Understand how EVO works with Next.js, Convex, and advanced LLM capabilities.
          </p>
        </div>

        <div className="bg-zinc-900 rounded-lg p-6 hover:bg-zinc-800/80 transition-colors">
          <div className="mb-4">
            <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
            </svg>
          </div>
          <h2 className="text-xl font-medium text-white mb-2">API Reference</h2>
          <p className="text-gray-400">
            Explore the complete API documentation and integration guides.
          </p>
        </div>
      </div>

      {/* Framework Section */}
      <div className="max-w-5xl mx-auto">
        <h2 className="text-2xl font-medium text-white mb-6">
          Key Features
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-zinc-900 rounded-lg p-6">
            <h3 className="text-lg font-medium text-white mb-3">Intelligent Processing</h3>
            <p className="text-gray-400">
              Advanced language model integration with smart API routing and context awareness.
            </p>
          </div>
          <div className="bg-zinc-900 rounded-lg p-6">
            <h3 className="text-lg font-medium text-white mb-3">Optimized Performance</h3>
            <p className="text-gray-400">
              Built-in prompt caching and efficient data handling for reduced latency and costs.
            </p>
          </div>
          <div className="bg-zinc-900 rounded-lg p-6">
            <h3 className="text-lg font-medium text-white mb-3">Secure Authentication</h3>
            <p className="text-gray-400">
              Robust security with Clerk authentication and user management.
            </p>
          </div>
          <div className="bg-zinc-900 rounded-lg p-6">
            <h3 className="text-lg font-medium text-white mb-3">Media Processing</h3>
            <p className="text-gray-400">
              YouTube video transcription and advanced content analysis capabilities.
            </p>
          </div>
        </div>
      </div>
    </main>
  );
};

export default DocsPage;
