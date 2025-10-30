import { FastifyInstance } from "fastify";
import { z } from "zod";
import { userSchema } from "../types/userSchema";
import { profileSchema } from "../types/profileSchema";
import { signUp, signIn, createProfile } from "../services/auth";
import { supabase } from "../config/supabase";
import { authenticateApiKey } from "../middleware/auth";

export async function authRoutes(app: FastifyInstance) {
  app.post("/registerUser", {
    preHandler: authenticateApiKey,
    schema: {
      body: userSchema,
      description: 'Register a new user',
      tags: ['auth'],
      summary: 'Register a new user with email and password',
      examples: [{
        name: 'default',
        value: {
          email: 'test@example.com',
          password: 'password123',
          confirmPassword: 'password123'
        }
      }]
    }
  }, async (request, reply) => {
    try {
      const validatedData = userSchema.parse(request.body);
      const data = await signUp(validatedData);
      return reply.send(data);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return reply.status(400).send({ issues: error.issues });
      }
      if (error instanceof Error) {
        return reply.status(400).send({ message: error.message });
      }
      return reply.status(500).send({ message: "Internal Server Error" });
    }
  });

  app.post("/login", {
    schema: {
      preHandler: authenticateApiKey,
      body: z.object({
        email: z.email(),
        password: z.string(),
      }),
      description: 'Login a user',
      tags: ['auth'],
      summary: 'Login a user with email and password',
      examples: [{
        name: 'default',
        value: {
          email: 'test@example.com',
          password: 'password123'
        }
      }]
    }
  }, async (request, reply) => {
    try {
      const { email, password } = userSchema.pick({ email: true, password: true }).parse(request.body);
      const data = await signIn({ email, password });
      return reply.send(data);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return reply.status(400).send({ issues: error.issues });
      }
      if (error instanceof Error) {
        return reply.status(400).send({ message: error.message });
      }
      return reply.status(500).send({ message: "Internal Server Error" });
    }
  });

  app.post("/createProfile", {
    preHandler: [async (request, reply) => {
      const { data, error } = await supabase.auth.getUser(request.headers.authorization?.replace("Bearer ", ""));
      if (error || !data.user) {
        return reply.status(401).send({ message: "Unauthorized" });
      }
      request.user = data.user;
    }],
    schema: {
      body: profileSchema,
      description: 'Create a user profile',
      tags: ['auth'],
      summary: 'Create a user profile with personal data',
      examples: [{
        name: 'default',
        value: {
          name: 'Test User',
          birth_date: '2000-01-01',
          height_cm: 180,
          weight_kg: 75,
          gender: 'male',
          fitness_level: 'intermediate',
          goal: 'Build muscle'
        }
      }]
    }
  }, async (request, reply) => {
    try {
      const validatedData = profileSchema.parse(request.body);
      const data = await createProfile(validatedData, (request.user as any).id);
      return reply.send(data);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return reply.status(400).send({ issues: error.issues });
      }
      if (error instanceof Error) {
        return reply.status(400).send({ message: error.message });
      }
      return reply.status(500).send({ message: "Internal Server Error" });
    }
  });
}