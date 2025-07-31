// src/routes/v1/auth.ts
import { FastifyPluginAsync } from "fastify";
import argon2 from "argon2";
import { ensureAuthenticated } from "../../utils/auth";
import prisma from "../../lib/prisma";

const authRoute: FastifyPluginAsync = async (fastify): Promise<void> => {
  // Protected route example
  fastify.get("/me", async (request, reply) => {
    if (!ensureAuthenticated(request, reply)) return;

    return { user: request.session.user };
  });
  // Login route
  fastify.post(
    "/login",
    {
      preHandler: fastify.csrfProtection,
      schema: {
        body: {
          type: "object",
          required: ["email", "password"],
          properties: {
            email: { type: "string", format: "email" },
            password: { type: "string", minLength: 6 },
          },
        },
        response: {
          200: {
            type: "object",
            properties: {
              message: { type: "string" },
            },
          },
        },
      },
    },
    async (request, reply) => {
      const { email, password } = request.body as {
        email: string;
        password: string;
      };

      const user = await prisma.user.findUnique({ where: { email } });

      if (!user) {
        return reply.status(401).send({ message: "Invalid email or password" });
      }

      const isPasswordValid = await argon2.verify(user.password, password);

      if (!isPasswordValid) {
        return reply.status(401).send({ message: "Invalid email or password" });
      }

      request.session.user = {
        id: user.id,
        email: user.email,
        first_name: user.first_name,
        last_name: user.last_name,
      };

      return reply.status(200).send({
        message: "Login successful",
      });
    }
  );
  // Register route
  fastify.post(
    "/register",
    {
      preHandler: fastify.csrfProtection,
      schema: {
        body: {
          type: "object",
          required: ["first_name", "last_name", "email", "password"],
          properties: {
            first_name: { type: "string", minLength: 1 },
            last_name: { type: "string", minLength: 1 },
            email: { type: "string", format: "email" },
            password: { type: "string", minLength: 6 },
          },
        },
        response: {
          201: {
            type: "object",
            properties: {
              message: { type: "string" },
            },
          },
          400: {
            type: "object",
            properties: {
              message: { type: "string" },
            },
          },
        },
      },
    },
    async (request, reply) => {
      try {
        const { first_name, last_name, email, password } = request.body as {
          first_name: string;
          last_name: string;
          email: string;
          password: string;
        };

        // Check if the user already exists
        const existingUser = await prisma.user.findUnique({
          where: { email },
        });

        if (existingUser) {
          return reply.status(400).send({ message: "User already exists" });
        }

        // Hash the password
        const hashedPassword = await argon2.hash(password);

        // Create the user in the database
        const user = await prisma.user.create({
          data: {
            first_name,
            last_name,
            email,
            password: hashedPassword,
          },
        });

        // Send email after the user is successfully created

        request.session.user = {
          id: user.id,
          email: user.email,
          first_name: user.first_name,
          last_name: user.last_name,
        };
        return reply.status(201).send({
          message: "User created successfully. Please verify your email.",
        });
      } catch (err) {
        fastify.log.error(err);
        return reply.status(500).send({ message: "Internal server error" });
      }
    }
  );
  fastify.post(
    "/logout",
    { preHandler: fastify.csrfProtection },
    async (request, reply) => {
      try {
        await request.session.destroy();

        return reply.status(200).send({ message: "Logged out successfully" });
      } catch (err) {
        fastify.log.error(err);
        return reply.status(500).send({ message: "Internal server error" });
      }
    }
  );
  fastify.get(
    "/csrf-token",
    {
      schema: {
        response: {
          201: {
            type: "object",
            properties: {
              message: { type: "string" },
              token: { type: "string" },
            },
          },
        },
      },
    },
    async (request, reply) => {
      const token = reply.generateCsrf();
      return reply.status(201).send({
        message: "CSRF token generated successfully",
        token: token,
      });
    }
  );
};

export default authRoute;
