import { authenticateApiKey } from '../middleware/auth';
import type { FastifyTypedInstance } from '../types'
import z from "zod"
import { getExerciseHandler, getExercisesHandler, updateExerciseHandler, deleteExerciseHandler } from '../controllers/exercises';

export async function exerciseRoutes(server: FastifyTypedInstance) {
  server.get('/exercise', {
    schema: {
      preHandler: authenticateApiKey,
      querystring: z.object({
        id: z.number(),
      }),
      description: 'Get a single exercise by id',
      summary: 'Get a single exercise by id',
      tags: ['exercise'],
      response: {
        200: z.object({
          message: z.unknown(),
        }),
        500: z.object({
          message: z.unknown(),
        }),
      },
    },
  }, getExerciseHandler);
  
  server.get('/exercises', {
    schema: {
      preHandler: authenticateApiKey,
      description: 'Get all exercises in the db',
      summary: 'Get all exercises',
      tags: ['exercise'],
      response: {
        200: z.object({
          message: z.unknown(),
        }),
        500: z.object({
          message: z.unknown(),
        }),
      },
    },
  }, getExercisesHandler);

  server.put('/exercise/:id', {
    schema: {
      preHandler: authenticateApiKey,
      description: 'Update an exercise by id',
      summary: 'Update an exercise by id',
      tags: ['exercise'],
      params: z.object({
        id: z.number(),
      }),
      response: {
        200: z.object({
          message: z.unknown(),
        }),
        500: z.object({
          message: z.unknown(),
        }),
      },
    },
  }, updateExerciseHandler);

  server.delete('/exercise/:id', {
    schema: {
      preHandler: authenticateApiKey,
      description: 'Delete an exercise by id',
      summary: 'Delete an exercise by id',
      tags: ['exercise'],
      params: z.object({
        id: z.number(),
      }),
      response: {
        200: z.object({
          message: z.unknown(),
        }),
        500: z.object({
          message: z.unknown(),
        }),
      },
    },
  }, deleteExerciseHandler);
}