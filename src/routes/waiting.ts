import { getWaitingHandle, updateWaitingStatusHandle } from '../controllers/waiting';
import { authenticateBearer } from '../middleware/auth';
import type { FastifyTypedInstance } from '../types'
import z from "zod"

export async function waitingRoutes(server: FastifyTypedInstance) {
  server.get('/waiting/:id', {
    preHandler: authenticateBearer,
    schema: {
      description: 'Get the user status waiting',
      summary: 'Get status',
      tags: ['waiting'],
      response: {
        200: z.object({
          message: z.unknown()
        }),
        404: z.object({
          message: z.string()
        }),
      }
    }
  }, getWaitingHandle);
  
  server.put('/waiting/:id', {
    preHandler: authenticateBearer,
    schema: {
      description: 'Update the user waiting status',
      summary: 'Update status',
      tags: ['waiting'],
      body: z.object({
        status: z.boolean(),
      }),
      response: {
        200: z.object({
          message: z.unknown()
        }),
        404: z.object({
          message: z.string()
        }),
        500: z.object({
          message: z.string()
        }),
      }
    }
  }, updateWaitingStatusHandle);
}
