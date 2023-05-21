import * as uuid from "https://deno.land/std@0.184.0/uuid/mod.ts";
import { Context } from "https://deno.land/x/oak@v12.4.0/mod.ts";
import { session } from "../database/connection.ts";
import { User, orderUser } from "../database/schemas/User.ts";

export async function getUsers(ctx: Context) {
  const users = await session.run("MATCH (n:User) RETURN n");
  const Users: Array<User> = users.records.map(
    (user) => user.get("n").properties as User
  );
  Users.forEach((user, index) => (Users[index] = orderUser(user)));
  ctx.response.body = Users;
}

export async function getUser(ctx: Context) {
  const id = ctx.request.url.pathname.split("/")[2];
  if (!id || uuid.validate(id) === false) {
    ctx.response.status = 400;
    ctx.response.body = { message: "Invalid user ID!" };
    return;
  }
  let User: User;
  try {
    const user = await session.run("MATCH (n:User) WHERE n.id = $id RETURN n", {
      id: id,
    });

    User = user.records[0].get("n").properties;
  } catch {
    ctx.response.status = 404;
    ctx.response.body = { message: "User could not be found!" };
    return;
  }
  ctx.response.body = orderUser(User);
}

export async function createUser(ctx: Context) {
  const { name, email, password, avatar } = await ctx.request.body({
    type: "json",
  }).value;
  const user = await session.run(
    "CREATE (n:User {id: $uid ,name: $name, email: $email, password: $password, avatar: $avatar, created_at: $created_at, online: $online}) RETURN n",
    {
      uid: crypto.randomUUID(),
      name,
      email,
      password,
      avatar,
      created_at: Date.now(),
      online: false,
    }
  );

  let User: User;
  try {
    User = user.records[0].get("n").properties;
  } catch {
    ctx.response.status = 400;
    ctx.response.body = { message: "User could not be not created!" };
    return;
  }
  ctx.response.body = orderUser(User);
}

export async function updateUser(ctx: Context) {
  const id = ctx.request.url.pathname.split("/")[2];
  const { name, email, password, avatar } = await ctx.request.body({
    type: "json",
  }).value;

  // @TODO check for session validation
  if (!id || uuid.validate(id) === false) {
    ctx.response.status = 400;
    ctx.response.body = { message: "Invalid user ID!" };
    return;
  }

  const user = await session.run(
    "MATCH (n:User) WHERE n.id = $id SET n.name = $name, n.email = $email, n.password = $password, n.avatar = $avatar RETURN n",
    {
      id,
      name,
      email,
      password,
      avatar,
    }
  );

  let User: User;
  try {
    User = user.records[0].get("n").properties;
  } catch {
    ctx.response.status = 404;
    ctx.response.body = { message: "User could not be found!" };
    return;
  }
  ctx.response.body = orderUser(User);
}

export async function deleteUser(ctx: Context) {
  const id = ctx.request.url.pathname.split("/")[2];
  if (!id || uuid.validate(id) === false) {
    ctx.response.status = 400;
    ctx.response.body = { message: "Invalid user ID!" };
    return;
  }
  const user = await session.run("MATCH (n:User) WHERE n.id = $id DELETE n", {
    id,
  });
  if (user.summary.counters["_stats"].nodesDeleted === 0) {
    ctx.response.status = 404;
    ctx.response.body = { message: "User could not be found!" };
    return;
  }

  ctx.response.body = { message: "User deleted successfully!" };
}
