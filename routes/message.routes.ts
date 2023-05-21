import { Router } from "https://deno.land/x/oak@v12.4.0/mod.ts";
import {
  createMessage,
  deleteMessage,
  getMessage,
  getMessages,
  updateMessage,
} from "../handlers/message.handlers.ts";

export const messagesRoutes = new Router()
  .get("/messages", getMessages)
  .get("/message/:id", getMessage)
  .post("/message", createMessage)
  .put("/message/:id", updateMessage)
  .delete("/message/:id", deleteMessage);
