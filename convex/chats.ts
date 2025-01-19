// Import statements
import { mutation, query } from "./_generated/server"; // Imports the mutation function from Convex server utilities
import { v } from "convex/values"; // Imports validation tools from Convex

// Define a new mutation called createChat
export const createChat = mutation({
  // A mutation basically tells convex that we want to create a new operation that will modify our database
  // Specify what arguments this mutation accepts
  args: {
    // This defines what information needs to be provided when someone wants to create a new chat. Here, we require a title.
    title: v.string(), // Requires a 'title' argument that must be a string
  },

  // The actual function that runs when this mutation is called
  handler: async (ctx, args) => {
    // First, it checls if the user is logged in, if not, it stops here with an error.
    // Check if the user is logged in
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) {
      throw new Error("Nope, you're not authorized to do that."); // If not logged in, stop here with an error
    }

    // Create a new chat in the database
    const chat = await ctx.db.insert("chats", {
      // If they are logged in, it creates a new chat entry in the database with the title provided, userid, and current timestamp.
      title: args.title, // Use the title provided in the arguments
      userId: identity.subject, // Store who created this chat. It gets this value from the user's token so thats pretty cool.
      createdAt: Date.now(), // Store when this chat was created
    });

    // Send back the newly created chat
    return chat;
  },
});

export const deletChat = mutation({
  args: {
    id: v.id("chats"),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) {
      throw new Error("Um, you're not supposed to be here.");
    }

    const chat = await ctx.db.get(args.id); // Very important. This checks if there's no chat OR if the chat id does not match the person that's trying to delete it, throw an error.
    if (!chat || chat.userId !== identity.subject) {
      throw new Error("You're not authorized to delete this chat.");
    }

    const messages = await ctx.db
      .query("messages") // Starts a query on the "messages" table in the database
      .withIndex("by_chat", (q) => q.eq("chatId", args.id)) // Filters for messages where the chatId field equals the id of the chat being deleted (args.id. ) Read this as "use the 'by_chat' index to find records where the 'chatId' field equals the value of args.id"
      .collect(); // Executes the query and collects all mactching messages into an array

    for (const message of messages) {
      // Think of this like a for loop thats iterating through the messages array, and deleting each message one by one.
      await ctx.db.delete(message._id);
    }

    await ctx.db.delete(args.id); // Deletes the entire chat from the database
  },
});

export const listChats = query({
  handler: async (ctx) => {
    const identity = await ctx.auth.getUserIdentity();
    console.log(identity);
    if (!identity) {
      throw new Error("You're not authorized to do that.");
    }

    const chats = await ctx.db
      .query("chats") // "Go to 'chats' section of the database"
      .withIndex("by_user", (q) => q.eq("userId", identity.subject)) // Find all books (chats) that belong to the user
      .order("desc") // This sorts them with the newest chat first, easier to see
      .collect(); // This collects all the chats and returns them as an array

    return chats;
  },
});
