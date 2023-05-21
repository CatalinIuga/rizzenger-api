import * as uuid from "https://deno.land/std@0.184.0/uuid/mod.ts";
import { Context } from "https://deno.land/x/oak@v12.4.0/mod.ts";
import { session } from "../database/connection.ts";
import { Conversation } from "../database/schemas/Conversation.ts";

export async function getConversations(ctx: Context) {
  const conversations = await session.run("MATCH (n:Conversation) RETURN n");
  const Conversations: Array<Conversation> = conversations.records.map(
    (conversation) => conversation.get("n").properties
  );
  ctx.response.body = Conversations;
}

export async function getConversation(ctx: Context) {
  const id = ctx.request.url.pathname.split("/")[2];
  if (!id || uuid.validate(id) === false) {
    ctx.response.status = 400;
    ctx.response.body = { message: "Invalid conversation ID!" };
    return;
  }
  let Conversation: Conversation;
  try {
    const conversation = await session.run(
      "MATCH (n:Conversation) WHERE n.id = $id RETURN n",
      {
        id: id,
      }
    );

    Conversation = conversation.records[0].get("n").properties;
  } catch {
    ctx.response.status = 404;
    ctx.response.body = { message: "Conversation could not be found!" };
    return;
  }
  ctx.response.body = Conversation;
}

export async function createConversation(ctx: Context) {
  const { name, participants } = await ctx.request.body({
    type: "json",
  }).value;
  const transaction = session.beginTransaction();
  const conversation = await transaction.run(
    "CREATE (n:Conversation {id: $uid ,name: $name, participants: $participants, created_at: $created_at, updated_at: $updated_at}) RETURN n",
    {
      uid: crypto.randomUUID(),
      name,
      participants,
      created_at: Date.now(),
      updated_at: Date.now(),
    }
  );

  let Conversation: Conversation;
  try {
    Conversation = conversation.records[0].get("n").properties;
  } catch {
    ctx.response.status = 400;
    ctx.response.body = { message: "Conversation could not be not created!" };
    return;
  }

  // @TODO: Fix this
  // participants.forEach(
  //   async (participant: string) =>
  //     await transaction.run(
  //       "MATCH (n:User) WHERE n.id = $id CREATE (n)-[:PARTICIPANT]->(c:Conversation {id:$cid}) RETURN n",
  //       {
  //         id: participant,
  //         cid: Conversation.id,
  //       }
  //     )
  // );
  await transaction.commit();
  ctx.response.body = Conversation;
}

export async function updateConversation(ctx: Context) {
  const id = ctx.request.url.pathname.split("/")[2];
  if (!id || uuid.validate(id) === false) {
    ctx.response.status = 400;
    ctx.response.body = { message: "Invalid conversation ID!" };
    return;
  }
  const { name, participants } = await ctx.request.body({
    type: "json",
  }).value;
  const conversation = await session.run(
    "MATCH (n:Conversation) WHERE n.id = $id SET n.name = $name, n.participants = $participants RETURN n",
    {
      id: id,
      name,
      participants,
    }
  );

  let Conversation: Conversation;
  try {
    Conversation = conversation.records[0].get("n").properties;
  } catch {
    ctx.response.status = 400;
    ctx.response.body = { message: "Conversation could not be not updated!" };
    return;
  }
  ctx.response.body = Conversation;
}

export async function deleteConversation(ctx: Context) {
  const id = ctx.request.url.pathname.split("/")[2];
  if (!id || uuid.validate(id) === false) {
    ctx.response.status = 400;
    ctx.response.body = { message: "Invalid conversation ID!" };
    return;
  }
  await session.run("MATCH (n:Conversation) WHERE n.id = $id DETACH DELETE n", {
    id: id,
  });
  ctx.response.body = { message: "Conversation deleted successfully!" };
}
