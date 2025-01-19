import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

// Common v validators include:
// v.string()      // String values
// v.number()      // Numeric values
// v.boolean()     // Boolean values
// v.id("table")   // References to other tables
// v.array(v.string()) // Arrays of values
// v.object({...}) // Objects with specific shape
// v.optional(v.string()) // Optional fields

export default defineSchema({
  chats: defineTable({
    title: v.string(),
    userId: v.string(),
    createdAt: v.number(),
  }).index("by_user", ["userId"]), // What this does is it creates an index that convex can use to find all chats belonging to a specific user. So, it filters chats based off of userId.

  messages: defineTable({
    chatId: v.id("chats"),
    content: v.string(),
    role: v.union(v.literal("user"), v.literal("assistant")), // This is a union type that allows for either "user" or "assistant (AI)" v.literal is a type that allows for a specific value
    createdAt: v.number(),
  }).index("by_chat", ["chatId"]),
});
