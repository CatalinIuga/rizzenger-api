import * as uuid from "https://deno.land/std@0.184.0/uuid/mod.ts";
import { Context } from "https://deno.land/x/oak@v12.4.0/mod.ts";
import { session } from "../database/connection.ts";
import { Message } from "../database/schemas/Message.ts";

export async function getMessages(ctx: Context) {
  const messages = await session.run("MATCH (n:Message) RETURN n");
  const Messages: Array<Message> = messages.records.map(
    (message) => message.get("n").properties
  );
  ctx.response.body = Messages;
}

export async function getMessage(ctx: Context) {
  const id = ctx.request.url.pathname.split("/")[2];
  if (!id || uuid.validate(id) === false) {
    ctx.response.status = 400;
    ctx.response.body = { message: "Invalid message ID!" };
    return;
  }
  let Message: Message;
  try {
    const message = await session.run(
      "MATCH (n:Message) WHERE n.id = $id RETURN n",
      {
        id: id,
      }
    );
    Message = message.records[0].get("n").properties;
  } catch {
    ctx.response.status = 404;
    ctx.response.body = { message: "Message could not be found!" };
    return;
  }
  ctx.response.body = Message;
}

export async function createMessage(ctx: Context) {
  const { content, sender, conversation } = await ctx.request.body({
    type: "json",
  }).value;
  const transaction = session.beginTransaction();
  const message = await transaction.run(
    "CREATE (n:Message {id: $uid ,content: $content, sender: $sender, conversation: $conversation, created_at: $created_at, updated_at: $updated_at}) RETURN n",
    {
      uid: crypto.randomUUID(),
      content,
      sender,
      conversation,
      created_at: Date.now(),
      updated_at: Date.now(),
    }
  );
  transaction.commit();
  let Message: Message;
  try {
    Message = message.records[0].get("n").properties;
  } catch {
    ctx.response.status = 400;
    ctx.response.body = { message: "Message could not be not created!" };
    return;
  }
  ctx.response.body = Message;
}

export async function updateMessage(ctx: Context) {
  const id = ctx.request.url.pathname.split("/")[2];
  if (!id || uuid.validate(id) === false) {
    ctx.response.status = 400;
    ctx.response.body = { message: "Invalid message ID!" };
    return;
  }
  const { content, sender, conversation } = await ctx.request.body({
    type: "json",
  }).value;
  const transaction = session.beginTransaction();
  const message = await transaction.run(
    "MATCH (n:Message) WHERE n.id = $id SET n.content = $content, n.sender = $sender, n.conversation = $conversation, n.updated_at = $updated_at RETURN n",
    {
      id: id,
      content,
      sender,
      conversation,
      updated_at: Date.now(),
    }
  );
  transaction.commit();
  let Message: Message;
  try {
    Message = message.records[0].get("n").properties;
  } catch {
    ctx.response.status = 400;
    ctx.response.body = { message: "Message could not be updated!" };
    return;
  }
  ctx.response.body = Message;
}

export async function deleteMessage(ctx: Context) {
  const id = ctx.request.url.pathname.split("/")[2];
  if (!id || uuid.validate(id) === false) {
    ctx.response.status = 400;
    ctx.response.body = { message: "Invalid message ID!" };
    return;
  }
  const transaction = session.beginTransaction();
  const message = await transaction.run(
    "MATCH (n:Message) WHERE n.id = $id DELETE n",
    {
      id: id,
    }
  );
  transaction.commit();
  if (message.summary.counters["_stats"].nodesDeleted === 0) {
    ctx.response.status = 400;
    ctx.response.body = { message: "Message could not be deleted!" };
    return;
  }
  ctx.response.body = { message: "Message deleted!" };
}
