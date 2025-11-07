import { getTrainingSheetHandle, deleteTrainingSheetHandle } from '../controllers/trainingSheet';
import { authenticateBearer } from '../middleware/auth'
import type { FastifyTypedInstance } from '../types'
import z from 'zod'

export async function profileRoutes(server: FastifyTypedInstance) {
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
    tags: ['profile'],
    },
  }, getTrainingSheetHandle);

  server.delete('/trainingSheet/:id', {
    preHandler: authenticateBearer,
    schema: {
      description: 'Delete a user training Sheet by id',
      summary: 'Delete a user training Sheet by id',
      tags: ['profile'],
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