import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

// Debug flag to control logging visibility throughout the file
const SHOW_COMMENTS = true;

// Define a query function to fetch messages from a chat
export const list = query({
  // Define the expected argument shape - requiring a chat ID that references the chats table
  args: { chatId: v.id("chats") },
  // Define the async handler function that processes the query
  handler: async (ctx, args) => {
    // Authentication check removed for now
    
    // Start building a database query for the messages table
    const messages = await ctx.db
      // Initialize the query on the messages table
      .query("messages")
      // Use the by_chat index and filter to only messages matching the provided chatId
      .withIndex("by_chat", (q) => q.eq("chatId", args.chatId))
      // Sort messages in ascending order (oldest first)
      .order("asc")
      // Execute the query and collect all results into an array
      .collect();

    // If debug logging is enabled, log information about the retrieved messages
    if (SHOW_COMMENTS) {
      console.log("Retrieved messages:", {
        chatId: args.chatId,
        count: messages.length,
      });
    }

    // Send the messages array back to the client
    return messages;
  },
});

// Define a mutation function to save new user messages
export const send = mutation({
  // Define required arguments: the chat ID and the message content
  args: {
    // chatId must be a valid reference to the chats table
    chatId: v.id("chats"),
    // content must be a string
    content: v.string(),
  },
  // Define the async handler function that processes the mutation
  handler: async (ctx, args) => {
    // If debug logging is enabled, log the incoming message details
    if (SHOW_COMMENTS) {
      console.log("Sending message:", {
        chatId: args.chatId,
        content: args.content,
      });
    }

    // Authentication checks removed temporarily
    // ... existing code ...

    // Create a new message record in the database
    const messageId = await ctx.db.insert("messages", {
      // Associate message with the specified chat
      chatId: args.chatId,
      // Store the content with newlines converted to escaped characters
      content: args.content.replace(/\n/g, "\\n"),
      // Set the role as 'user' for this message
      role: "user",
      // Add a timestamp for when the message was created
      createdAt: Date.now(),
    });

    // If debug logging is enabled, log the successful message storage
    if (SHOW_COMMENTS) {
      console.log("Saved user message:", {
        messageId,
        chatId: args.chatId,
      });
    }

    // Return the ID of the newly created message
    return messageId;
  },
});

// Define a mutation function to store messages from any role
export const store = mutation({
  // Define required arguments: chat ID, content, and the role of the message sender
  args: {
    // chatId must be a valid reference to the chats table
    chatId: v.id("chats"),
    // content must be a string
    content: v.string(),
    // role must be either "user" or "assistant"
    role: v.union(v.literal("user"), v.literal("assistant")),
  },
  // Define the async handler function that processes the mutation
  handler: async (ctx, args) => {
    // If debug logging is enabled, log the message details being stored
    if (SHOW_COMMENTS) {
      console.log("Storing message:", {
        chatId: args.chatId,
        role: args.role,
        contentLength: args.content.length,
      });
    }

    // Create a new message record in the database
    const messageId = await ctx.db.insert("messages", {
      // Associate message with the specified chat
      chatId: args.chatId,
      // Store content with special character handling
      content: args.content
        // Convert newlines to escaped characters
        .replace(/\n/g, "\\n")
        // Escape backslashes (HTML intentionally not escaped for system content)
        .replace(/\\/g, "\\\\"),
      // Store the specified role (user or assistant)
      role: args.role,
      // Add a timestamp for when the message was created
      createdAt: Date.now(),
    });

    // If debug logging is enabled, log the successful storage
    if (SHOW_COMMENTS) {
      console.log("Stored message:", {
        messageId,
        chatId: args.chatId,
        role: args.role,
      });
    }

    // Return the ID of the newly created message
    return messageId;
  },
});

// Define a query function to get the most recent message in a chat
export const getLastMessage = query({
  // Define the required argument - a chat ID reference
  args: { chatId: v.id("chats") },
  // Define the async handler function that processes the query
  handler: async (ctx, args) => {
    // Get the current user's identity from the authentication context
    const identity = await ctx.auth.getUserIdentity();
    // If no user is authenticated, throw an error
    if (!identity) {
      throw new Error("Not authenticated");
    }

    // Fetch the chat record from the database
    const chat = await ctx.db.get(args.chatId);
    // If chat doesn't exist or user doesn't own it, throw an error
    if (!chat || chat.userId !== identity.subject) {
      throw new Error("Unauthorized");
    }

    // Query the messages table for the most recent message
    const messages = await ctx.db
      // Initialize the query on the messages table
      .query("messages")
      // Use the by_chat index and filter to only messages matching the provided chatId
      .withIndex("by_chat", (q) => q.eq("chatId", args.chatId))
      // Sort in descending order (newest first)
      .order("desc")
      // Get only the first (most recent) message
      .first();

    // Return the most recent message (or null if none exists)
    return messages;
  },
});