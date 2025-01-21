// basically the AI file, everything AI, is in here
import { OpenAI } from "@langchain/openai";
import { ToolNode } from "@langchain/langgraph/prebuilt";
import wxflows  from "@wxflows/sdk/langchain";
// connext to wxflows
const toolClient = new wxflows({
    endpoint: process.env.WXFLOWS_ENDPOINT || "",
    apikey: process.env.WXFLOWS_API_KEY || ""
})

const tools = await toolClient.lcTools;
const toolNode = new ToolNode(tools)

const initializeModel = () => {
    const model = new OpenAI({
        modelName: "gpt-4o",
        apiKey: process.env.OPENAI_API_KEY,
        temperature: 0.7, // Higher temp for more creative output
        maxTokens: 4096, // Hifher max tokens for longer responses
        streaming: true, // Streams the response as it's being generated
        configuration: {
            defaultHeaders: {
                "OpenAI-Beta": "chatml"
            }
        }
    }).bindTools(tools)

    return model;
}