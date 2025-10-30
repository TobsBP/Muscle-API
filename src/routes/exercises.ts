import type { FastifyTypedInstance } from '../types'
import { getExercises, getExercise } from '../repositories/exercises';
import z from "zod"

export async function exerciseRoutes(server: FastifyTypedInstance) {
  server.get('/getExercise', {
    schema: {
      querystring: z.object({
        id: z.number(),
      }),
      description: 'Get a single exercise by id',
      summary: 'Get a single exercise by id',
      tags: ['exercises'],
      response: {
        200: z.object({
          message: z.unknown(),
        }),
        500: z.object({
          message: z.unknown(),
        }),
      },
    },
  }, async (request, reply) => {
    try {
      const exercise = await getExercise(request.query.id); 

      return reply.status(200).send({ message: exercise });
    } catch (error) {
      
      console.error("error:", error);

      return reply.status(500).send({ message: "Failed" });
    }
  });
  
  server.get('/getExercises', {
    schema: {
      description: 'Get all exercises in the db',
      summary: 'Get all exercises',
      tags: ['exercises'],
      response: {
        200: z.object({
          message: z.unknown(),
        }),
        500: z.object({
          message: z.unknown(),
        }),
      },
    },
  }, async (request, reply) => {
    try {
      const exercise = await getExercises(); 

      return reply.status(200).send({ message: exercise });
    } catch (error) {
      
      console.error("error:", error);

      return reply.status(500).send({ message: "Failed" });
    }
  });
}