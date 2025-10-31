import { authenticateApiKey } from '../middleware/auth';
import type { FastifyTypedInstance } from '../types'
import z from "zod"
import { getWorkoutHandler, getWorkoutsHandler, updateWorkoutHandler, deleteWorkoutHandler } from '../controllers/workouts';

export async function workoutRoutes(server: FastifyTypedInstance) {
  server.get('/workouts', {
    preHandler: authenticateApiKey,
    schema: {
      description: 'Get all workouts registred in the db',
      summary: 'Get all workouts',
      tags: ['workout'],
      response:{
        200: z.object({
          message: z.unknown()
        }),
        404: z.object({
          message: z.string()
        }),
      }
    }
  }, getWorkoutsHandler);
  
  server.get('/workout', {
    schema: {
      preHandler: authenticateApiKey,
      description: 'Get a single workout by id',
      summary: 'Get a single workout by id',
      tags: ['workout'],
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
  }, getWorkoutHandler);

  server.put('/workout/:id', {
    schema: {
      preHandler: authenticateApiKey,
      description: 'Update a workout by id',
      summary: 'Update a workout by id',
      tags: ['workout'],
      params: z.object({
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
  }, updateWorkoutHandler);

  server.delete('/workout/:id', {
    schema: {
      preHandler: authenticateApiKey,
      description: 'Delete a workout by id',
      summary: 'Delete a workout by id',
      tags: ['workout'],
      params: z.object({
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
  }, deleteWorkoutHandler);
}