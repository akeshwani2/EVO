import { Id } from "../../convex/_generated/dataModel";

// Define constant for SSE data prefix - used to identify data chunks in Server-Sent Events
export const SSE_DATA_PREFIX = "data: " as const;
// Define constant for SSE completion message
export const SSE_DONE_MESSAGE = "[DONE]" as const;
// Define constant for SSE message delimiter
export const SSE_LINE_DELIMITER = "\n\n" as const; // Used to separate messages in SSE, formatting mostly

// Define possible roles in a chat conversation
export type MessageRole = "user" | "assistant";

// Interface defining structure of a chat message
export interface Message {
  role: MessageRole;    // Role of the message sender (user or assistant)
  content: string;      // Content of the message
}

// Enum defining different types of stream messages
export enum StreamMessageType {
  Token = "token",           // Represents a token chunk in the stream
  Error = "error",           // Represents an error message
  Connected = "connected",    // Indicates successful connection
  Done = "done",             // Indicates stream completion
  ToolStart = "tool_start",  // Indicates the start of a tool operation
  ToolEnd = "tool_end",      // Indicates the end of a tool operation
}

// Base interface for all stream messages
export interface BaseStreamMessage {
  type: StreamMessageType;   // Type of the stream message
}

// Interface for token messages in the stream
export interface TokenMessage extends BaseStreamMessage {
  type: StreamMessageType.Token;  // Specific type for token messages
  token: string;                  // The actual token content
}

// Interface for error messages in the stream
export interface ErrorMessage extends BaseStreamMessage {
  type: StreamMessageType.Error;  // Specific type for error messages
  error: string;                  // The error message content
}

// Interface for connection confirmation messages
export interface ConnectedMessage extends BaseStreamMessage {
  type: StreamMessageType.Connected;  // Specific type for connected messages
}

// Interface for stream completion messages
export interface DoneMessage extends BaseStreamMessage {
  type: StreamMessageType.Done;  // Specific type for done messages
}

// Interface for tool start messages
export interface ToolStartMessage extends BaseStreamMessage {
  type: StreamMessageType.ToolStart;  // Specific type for tool start messages
  tool: string;                       // Name of the tool being used
  input: unknown;                     // Input parameters for the tool
}

// Interface for tool completion messages
export interface ToolEndMessage extends BaseStreamMessage {
  type: StreamMessageType.ToolEnd;  // Specific type for tool end messages
  tool: string;                     // Name of the tool that completed
  output: unknown;                  // Output result from the tool
}

// Union type of all possible stream message types
export type StreamMessage =
  | TokenMessage
  | ErrorMessage
  | ConnectedMessage
  | DoneMessage
  | ToolStartMessage
  | ToolEndMessage;

// Interface defining the structure of a chat request
export interface ChatRequestBody {
  messages: Message[];          // Array of previous messages in the chat
  newMessage: string;          // The new message being sent
  chatId: Id<"chats">;        // Unique identifier for the chat
}