import fp from "fastify-plugin";
import session, { FastifySessionOptions } from "@fastify/session";
import { RedisStore } from "connect-redis";
import type { Redis } from "ioredis";

/**
 * Session plugin for fastify
 *
 * @see https://github.com/fastify/session
 */
export default fp<FastifySessionOptions>(async (fastify) => {
  const redisClient = fastify.redis as Redis;

  await fastify.register(session, {
    secret: process.env.SESSION_SECRET!,
    cookie: {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 24 * 60 * 60 * 1000, // 24 hours
    },
    store: new RedisStore({ client: redisClient }),
    saveUninitialized: false,
  });
});
