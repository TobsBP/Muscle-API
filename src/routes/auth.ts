import { FastifyInstance } from "fastify";
import { z } from "zod";
import { userSchema } from "../types/userSchema";
import { profileSchema } from "../types/profileSchema";
import { supabase } from "../config/supabase";
import { authenticateApiKey } from "../middleware/auth";
import { registerUserHandler, loginHandler, createProfileHandler } from "../controllers/auth";

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
  }, registerUserHandler);

  app.post("/login", {
    schema: {
      preHandler: authenticateApiKey,
      body: z.object({
        email: z.string().email(),
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
  }, loginHandler);

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
  }, createProfileHandler);
}