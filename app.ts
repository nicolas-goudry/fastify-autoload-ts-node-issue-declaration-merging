import path from "node:path";
import AutoLoad from "@fastify/autoload";
import type { FastifyPluginAsync } from "fastify";

const app: FastifyPluginAsync = async (fastify, options): Promise<void> => {
  await fastify.register(AutoLoad, {
    dir: path.join(__dirname, "plugins"),
    options,
  });
  await fastify.register(AutoLoad, {
    dir: path.join(__dirname, "routes"),
    options,
  });
};

export default app;
