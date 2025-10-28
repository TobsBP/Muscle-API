import type { FastifyTypedInstance } from '../types'
import { getExercises, getExercise } from '../services/exercises';
import z from "zod"

export async function exerciseRoutes(server: FastifyTypedInstance) {
  server.get('/dayExercise', {
    schema: {
      querystring: z.object({
        id: z.number(),
      }),
      description: 'Get the day exercise based in the id',
      response: {
        200: z.object({
          message: z.unknown(),
        }),
        500: z.object({
          message: z.unknown(),
        }),
      },
      tags: ['Exercises']
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
}