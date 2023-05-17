import { Context, Router } from "https://deno.land/x/oak@v12.4.0/mod.ts";

export const setupRoutes = new Router().get("/", (ctx: Context) => {
  ctx.response.body = "Hello World!";
});
