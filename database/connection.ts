import { Arango } from "https://deno.land/x/darango@0.1.6/mod.ts";
import { Users } from "./schemas/Users.ts";

const arango = await Arango.basicAuth({
  uri: Deno.env.get("ARANGO_URI") || "http://localhost:8529/_db/_system",
  username: Deno.env.get("ARANGO_USERNAME") || "root",
  password: Deno.env.get("ARANGO_PASSWORD") || "openSesame",
});

const collection = await arango.createCollection<Users>("Users");
console.log(collection);

await collection.create({
  name: "mama",
  email: "asf",
  password: "asf",
  created_at: new Date(),
  avatar: "asf",
  online: true,
});
