import fp from "fastify-plugin";
import sensible, { FastifySensibleOptions } from "@fastify/sensible";

/**
 * Defaults for Fastify that everyone can agree on
 *
 * @see https://github.com/fastify/fastify-sensible
 */
export default fp<FastifySensibleOptions>(async (fastify) => {
  fastify.register(sensible);
});
