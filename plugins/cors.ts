import cors, { type FastifyCorsOptions } from "@fastify/cors";
import fp from "fastify-plugin";

export default fp<FastifyCorsOptions>(
  async (fastify) =>
    fastify.register(cors, {
      origin: fastify.config.NODE_ENV === "production" ? "example.com" : "*",
    }),
  {
    dependencies: ["env"],
    name: "cors",
  }
);
