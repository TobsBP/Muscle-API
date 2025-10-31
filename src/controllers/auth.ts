import { FastifyRequest, FastifyReply } from "fastify";
import { z } from "zod";
import { userSchema } from "../types/userSchema";
import { profileSchema } from "../types/profileSchema";
import { signUp, signIn, createProfile } from "../services/auth";

export async function registerUserHandler(request: FastifyRequest, reply: FastifyReply) {
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
}

export async function loginHandler(request: FastifyRequest, reply: FastifyReply) {
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
}

export async function createProfileHandler(request: FastifyRequest, reply: FastifyReply) {
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
}
