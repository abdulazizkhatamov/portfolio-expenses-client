// src/routes/v1/index.ts
import { FastifyPluginAsync } from "fastify";
import authRoute from "./auth";

const v1: FastifyPluginAsync = async (fastify): Promise<void> => {
  void fastify.register(authRoute, { prefix: "/auth" });
};

export default v1;
