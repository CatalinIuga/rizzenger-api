import { Router } from "https://deno.land/x/oak@v12.4.0/mod.ts";
import {
  createUser,
  deleteUser,
  getUser,
  getUsers,
  updateUser,
} from "../handlers/user.handlers.ts";

export const userRoutes = new Router()
  .get("/users", getUsers)
  .get("/user/:id", getUser)
  .post("/user", createUser)
  .put("/user/:id", updateUser)
  .delete("/user/:id", deleteUser);
