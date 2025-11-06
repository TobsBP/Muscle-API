import { getWorkoutHandler, getWorkoutsHandler, updateWorkoutHandler, deleteWorkoutHandler, updateWorkoutStatusHandler } from '../controllers/workouts';
import { authenticateBearer } from '../middleware/auth';
import type { FastifyTypedInstance } from '../types'
import z from "zod"

export async function workoutRoutes(server: FastifyTypedInstance) {
  server.get('/workouts', {
    preHandler: authenticateBearer,
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
  
  server.get('/workout/:id', {
    preHandler: authenticateBearer,
    schema: {
      params: z.object({
        id: z.string(),
      }),
      description: 'Get user daily workout with exercises',
      tags: ['workout'],
      response: {
        200: z.object({ message: z.unknown() }),
        500: z.object({ message: z.unknown() }),
      },
    },
  }, getWorkoutHandler)

  server.put('/workoutUpdateStatus/:id', {
    preHandler: authenticateBearer,
    schema: {
      description: 'Update a workout by id',
      summary: 'Update a workout by id',
      tags: ['workout'],
      params: z.object({
        id: z.coerce.number(),
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
  }, updateWorkoutStatusHandler);

  server.put('/workout/:id', {
    preHandler: authenticateBearer,
    schema: {
      description: 'Update a workout by id',
      summary: 'Update a workout by id',
      tags: ['workout'],
      params: z.object({
        id: z.coerce.number(),
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
    preHandler: authenticateBearer,
    schema: {
      description: 'Delete a workout by id',
      summary: 'Delete a workout by id',
      tags: ['workout'],
      params: z.object({
        id: z.coerce.number(),
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