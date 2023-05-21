import { Application } from "https://deno.land/x/oak@v12.4.0/mod.ts";
import { conversationRoutes } from "./routes/conversation.routes.ts";
import { messagesRoutes } from "./routes/message.routes.ts";
import { userRoutes } from "./routes/user.routes.ts";

const app = new Application();

app.use(userRoutes.routes());
app.use(userRoutes.allowedMethods());

app.use(conversationRoutes.routes());
app.use(conversationRoutes.allowedMethods());

app.use(messagesRoutes.routes());
app.use(messagesRoutes.allowedMethods());

app.addEventListener("listen", ({ hostname, port, secure }) => {
  console.log(
    `Listening on: ${secure ? "https://" : "http://"}${
      hostname || "localhost"
    }:${port}`
  );
});
await app.listen({ port: 8000 });
