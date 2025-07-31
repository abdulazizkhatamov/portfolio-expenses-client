// types/env.d.ts or similar
import "fastify";

declare module "fastify" {
  interface FastifyInstance {
    config: {
      REDIS_HOST: string;
      REDIS_PORT: string;
      REDIS_USERNAME?: string;
      REDIS_PASSWORD?: string;

      NODE_ENV: "development" | "production";
      SESSION_SECRET: string;
      // add other env vars if needed
    };
  }
}
