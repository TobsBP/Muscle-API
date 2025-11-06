import { FastifyInstance } from "fastify";
import { z } from "zod";
import { userSchema } from "../types/userSchema";
import { profileSchema } from "../types/profileSchema";
import { supabase } from "../config/supabase";
import { authenticateBearer } from "../middleware/auth";
import { registerUserHandler, loginHandler, createProfileHandler } from "../controllers/auth";

export async function authRoutes(app: FastifyInstance) {
  app.post("/registerUser", {
    preHandler: authenticateBearer,
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
    // preHandler: authenticateBearer,
    schema: {
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
  }, loginHandler);

  app.post("/createProfile", {
    preHandler: authenticateBearer,
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