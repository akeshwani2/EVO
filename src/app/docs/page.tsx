import { Button } from "@/components/ui/button";
import React from "react";

const page = () => {
  return (
    <main className="min-h-screen bg-black flex flex-col gap-4">
      <div className="flex items-center justify-center w-full">
        <h2 className="text-4xl tracking-tight bg-gradient-to-b from-white to-gray-500 bg-clip-text text-transparent mt-4">
          Welcome to AXIS
        </h2>
      </div>
      <div className="ml-3">
        <h2 className="text-2xl tracking-tight bg-gradient-to-b from-white to-gray-500 bg-clip-text text-transparent">
          What is AXIS?
        </h2>
        <p className="text-white max-w-3xl">
          AXIS is designed to streamline and enhance user interactions with
          advanced AI capabilities. By leveraging the latest version of Next.js
          for the frontend, AXIS allows users to input messages and receive
          intelligent responses through a seamless interface. The system
          integrates with a powerful language model (LLM) to process user
          queries, utilizing predefined APIs to determine the most appropriate
          actions and responses. This includes capabilities like retrieving
          YouTube video transcriptions and facilitating dynamic conversations.
          With a robust backend supported by a Convex database and efficient
          authentication via Clerk, AXIS ensures secure and optimized
          performance. Additionally, prompt caching is employed to significantly
          reduce latency and costs, making AXIS a fast and cost-effective
          solution for complex AI-driven interactions.
        </p>
      </div>
      <div className="items-center justify-center ml-3">
        <div className="flex flex-row gap-4 ">
          <Button className="bg-white text-black px-4 py-2 rounded-xl flex hover:bg-gray-200 items-center gap-2">
            What is AI Agent
          </Button>
          <Button className="bg-white text-black px-4 py-2 rounded-xl flex hover:bg-gray-200 items-center gap-2">
            test
          </Button>
          <Button className="bg-white text-black px-4 py-2 rounded-xl flex hover:bg-gray-200 items-center gap-2">
            test
          </Button>
        </div>
      </div>
    </main>
  );
};

export default page;
