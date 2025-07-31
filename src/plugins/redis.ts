import fp from "fastify-plugin";
import redis, { FastifyRedisPluginOptions } from "@fastify/redis";

/**
 * Plugin to share a common Redis connection across Fastify
 *
 * @see https://github.com/fastify/fastify-redis
 */
export default fp<FastifyRedisPluginOptions>(async (fastify) => {
  await fastify.register(redis, {
    host: "127.0.0.1",
    port: 6379,
  });
});
