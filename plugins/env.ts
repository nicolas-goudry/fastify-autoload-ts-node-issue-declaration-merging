import fastifyEnv from "@fastify/env";
import fp from "fastify-plugin";

declare module "fastify" {
  interface FastifyInstance {
    config: {
      NODE_ENV: "development" | "production";
    };
  }
}

const schema = {
  type: "object",
  required: ["NODE_ENV"],
  properties: {
    NODE_ENV: {
      type: "string",
      enum: ["development", "production"],
    },
  },
};

export default fp(async (fastify) => fastify.register(fastifyEnv, { schema }), {
  name: "env",
});
