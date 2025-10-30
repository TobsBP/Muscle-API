import { getWorkout, getWorkouts } from '../repositories/workouts';
import type { FastifyTypedInstance } from '../types'
import z from "zod"

export async function workoutRoutes(server: FastifyTypedInstance) {
  server.get('/getWorkouts', {
    schema: {
      description: 'Get all workouts registred in the db',
      summary: 'Get all workouts',
      tags: ['workouts'],
      response:{
        200: z.object({
          message: z.unknown()
        }),
        404: z.object({
          message: z.string()
        }),
      }
    }
  }, async(request, reply) => {
    try {
      const response = await getWorkouts();

      return reply.status(200).send({ message: response });
    } catch (error) {
      console.log(error);

      return reply.status(200).send({ message: "Error to fetch" })      
    }
  });
  
  server.get('/getWorkout', {
    schema: {
      description: 'Get a single workout by id',
      summary: 'Get a single workout by id',
      tags: ['workouts'],
      querystring: z.object({
        id: z.number(),
      }),
      response:{
        200: z.object({
          message: z.unknown()
        }),
        404: z.object({
          message: z.string()
        }),
      }
    }
  }, async(request, reply) => {
    try {
      const response = await getWorkout(request.query.id);

      return reply.status(200).send({ message: response });
    } catch (error) {
      console.log(error);

      return reply.status(200).send({ message: "Error to fetch" })      
    }
  });
}