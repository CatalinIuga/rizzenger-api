import { Router } from "https://deno.land/x/oak@v12.4.0/mod.ts";
import {
  createConversation,
  deleteConversation,
  getConversation,
  getConversations,
  updateConversation,
} from "../handlers/conversation.handlers.ts";

export const conversationRoutes = new Router()
  .get("/conversations", getConversations)
  .get("/conversation/:id", getConversation)
  .post("/conversation", createConversation)
  .put("/conversation/:id", updateConversation)
  .delete("/conversation/:id", deleteConversation);
