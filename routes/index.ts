import type { FastifyPluginAsync } from "fastify";

const health: FastifyPluginAsync = async (fastify, _options): Promise<void> => {
  fastify.get("/", async function (_, reply) {
    return reply.code(200).send(`Environment: ${fastify.config.NODE_ENV}`);
  });
};

export default health;
