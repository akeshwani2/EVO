import { ArrowLeft, Zap, Clock, Database, LineChart } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const CachingPage = () => {
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
          Prompt Caching System
        </h1>
        <p className="text-gray-400 text-lg">
          Understanding EVO's intelligent caching mechanism for improved performance and reduced costs
        </p>
      </div>

      {/* Overview Section */}
      <div className="max-w-5xl mx-auto mb-16">
        <div className="bg-zinc-900 rounded-lg p-8">
          <h2 className="text-2xl font-medium text-white mb-6">What is prompt caching and how does EVO use it?</h2>
          <div className="space-y-6 text-gray-400">
            <p>
              Prompt caching is a performance optimization technique where EVO intelligently stores and reuses responses 
              to similar queries. For each conversation, EVO strategically caches three key components:
            </p>
            <ul className="list-disc pl-6 space-y-3">
              <li>
                The initial system configuration message, ensuring consistent behavior across sessions
              </li>
              <li>
                The most recent user message, enabling quick responses to repeated questions
              </li>
              <li>
                The second-to-last human message, maintaining conversation context while optimizing performance (think of this as a checkpoint)
              </li>
            </ul>
            <p>
              When you send a message, EVO first checks if a similar query exists in its cache. If found, it can 
              respond instantly without making additional API calls to language models. This system not only speeds 
              up response times but also significantly reduces operational costs by minimizing redundant processing.
            </p>
          </div>
        </div>
      </div>

      {/* Benefits Grid */}
      <div className="max-w-5xl mx-auto mb-16">
        <h2 className="text-2xl font-medium text-white mb-6">Key Benefits</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-zinc-900 rounded-lg p-6">
            <div className="flex items-center gap-3 mb-4">
              <Zap className="w-6 h-6 text-white" />
              <h3 className="text-lg font-medium text-white">Faster Responses</h3>
            </div>
            <p className="text-gray-400">
              Cached responses are delivered instantly, eliminating the need for repeated API calls 
              and language model processing for similar queries.
            </p>
          </div>

          <div className="bg-zinc-900 rounded-lg p-6">
            <div className="flex items-center gap-3 mb-4">
              <LineChart className="w-6 h-6 text-white" />
              <h3 className="text-lg font-medium text-white">Cost Efficiency</h3>
            </div>
            <p className="text-gray-400">
              By reducing the number of API calls to external services and language models, 
              the caching system significantly lowers operational costs.
            </p>
          </div>
        </div>
      </div>

      {/* Implementation Details */}
      <div className="max-w-5xl mx-auto mb-16">
        <h2 className="text-2xl font-medium text-white mb-6">Implementation Details</h2>
        <div className="space-y-6">
          <div className="bg-zinc-900 rounded-lg p-6">
            <div className="flex items-start gap-4">
              <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center flex-shrink-0">
                <Database className="w-4 h-4 text-white" />
              </div>
              <div>
                <h4 className="text-white font-medium mb-2">Cache Storage</h4>
                <p className="text-gray-400">
                  Responses are stored in Convex with associated metadata including:
                </p>
                <ul className="mt-2 space-y-1 text-gray-400 list-disc pl-6">
                  <li>Original prompt text</li>
                  <li>Response content</li>
                  <li>Timestamp</li>
                  <li>Usage metrics</li>
                </ul>
              </div>
            </div>
          </div>

          <div className="bg-zinc-900 rounded-lg p-6">
            <div className="flex items-start gap-4">
              <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center flex-shrink-0">
                <Clock className="w-4 h-4 text-white" />
              </div>
              <div>
                <h4 className="text-white font-medium mb-2">Cache Invalidation</h4>
                <p className="text-gray-400">
                  The system employs smart cache invalidation strategies:
                </p>
                <ul className="mt-2 space-y-1 text-gray-400 list-disc pl-6">
                  <li>Time-based expiration for dynamic content</li>
                  <li>Usage-based retention for popular queries</li>
                  <li>Automatic cleanup for outdated entries</li>
                  <li>Context-aware invalidation</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Performance Metrics */}
      <div className="max-w-5xl mx-auto">
        <h2 className="text-2xl font-medium text-white mb-6">Performance Impact</h2>
        <div className="bg-zinc-900 rounded-lg p-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-4 bg-zinc-800 rounded-lg">
              <h4 className="text-white font-medium mb-2">Response Time</h4>
              <p className="text-3xl font-bold text-white mb-1">~200ms</p>
              <p className="text-sm text-gray-400">Average for cached responses</p>
            </div>

            <div className="p-4 bg-zinc-800 rounded-lg">
              <h4 className="text-white font-medium mb-2">Cache Hit Rate</h4>
              <p className="text-3xl font-bold text-white mb-1">35%</p>
              <p className="text-sm text-gray-400">Average across all queries</p>
            </div>

            <div className="p-4 bg-zinc-800 rounded-lg">
              <h4 className="text-white font-medium mb-2">Cost Reduction</h4>
              <p className="text-3xl font-bold text-white mb-1">40%</p>
              <p className="text-sm text-gray-400">Average monthly savings</p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default CachingPage;