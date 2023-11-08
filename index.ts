import fastify from "fastify";
import appService from "./app";

const app = fastify({
  logger: true,
});

void app.register(appService).then(() => {
  app.listen({ port: 3000 });
});
