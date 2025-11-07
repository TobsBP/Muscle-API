import { getTrainingSheetHandle, deleteTrainingSheetHandle, createTrainingSheetHandle } from '../controllers/trainingSheet';
import { authenticateBearer } from '../middleware/auth'
import type { FastifyTypedInstance } from '../types'
import z from 'zod'

export async function trainingSheetRoutes(server: FastifyTypedInstance) {
  server.get('/trainingSheet/:id', {
  preHandler: authenticateBearer,
  schema: {
    description: 'Get the user training Sheet based on the id',
    summary: 'Get the user training Sheet based on the id',
    params: z.object({
      id: z.string(),
    }),
    response: {
      200: z.object({
        message: z.unknown(),
      }),
      400: z.object({
        message: z.literal('Error'),
      }),
    },
    tags: ['training-sheet'],
    },
  }, getTrainingSheetHandle);

  server.post('/trainingSheet', {
    preHandler: authenticateBearer,
    schema: {
      description: 'Create a new training sheet',
      summary: 'Create a new training sheet',
      body: z.object({
        user_id: z.uuid(),
        title: z.string(),
        exercises: z.array(z.object({
          name: z.string(),
          sets: z.number(),
          reps: z.string(),
          wheight: z.number(),
        })),
      }),
      response: {
        201: z.object({
          message: z.unknown(),
        }),
        500: z.object({
          message: z.string(),
        }),
      },
      tags: ['training-sheet'],
    },
  }, createTrainingSheetHandle);

  server.delete('/trainingSheet/:id', {
    preHandler: authenticateBearer,
    schema: {
      description: 'Delete a user training Sheet by id',
      summary: 'Delete a user training Sheet by id',
      tags: ['training-sheet'],
      params: z.object({
        id: z.string(),
      }),
      response: {
        200: z.object({
          message: z.unknown()
        }),
        400: z.object({
          message: z.literal('Error')
        })
      },
    }   
  }, deleteTrainingSheetHandle);
}