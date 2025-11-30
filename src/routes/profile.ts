import { deleteUserProfileHandler, getProfileHandler, updateProfileHandler, getProfilesHandler, getFirstAccessHandler, updateFirstAccessHandler } from '../controllers/profile';
import { authenticateBearer } from '../middleware/auth'
import type { FastifyTypedInstance } from '../types'
import z from 'zod'

export async function profileRoutes(server: FastifyTypedInstance) {
  server.get('/userProfile/:id/first-access', {
    preHandler: authenticateBearer,
    schema: {
      description: 'Get the user first access status based on the id',
      summary: 'Get the user first access status based on the id',
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
  }, getFirstAccessHandler);

  server.put('/userProfile/:id/first-access', {
    preHandler: authenticateBearer,
    schema: {
      description: 'Update the user first access status based on the id',
      summary: 'Update the user first access status based on the id',
      params: z.object({
        id: z.string(),
      }),
      body: z.object({
        first_access: z.boolean(),
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
  }, updateFirstAccessHandler);

  server.get('/userProfile/:id', {
  preHandler: authenticateBearer,
  schema: {
    description: 'Get the user profile based on the id',
    summary: 'Get the user profile based on the id',
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
  }, getProfileHandler);

  server.get('/usersProfiles', {
    preHandler: authenticateBearer,
    schema: {
      description: 'Get all users profiles',
      summary: 'Get all users profiles',
      response: {
        200: z.object({
          message: z.unknown()
        }),
        400: z.object({
          message: z.literal('Error')
        })
      },
      tags: ['profile']
    }
  }, getProfilesHandler)

  server.put('/userProfile/:id', {
    preHandler: authenticateBearer,
    schema: {
      description: 'Update a user profile by id',
      summary: 'Update a user profile by id',
      tags: ['profile'],
      params: z.object({
        id: z.string().uuid(),
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
  }, updateProfileHandler )

  server.delete('/deleteProfile/:id', {
    preHandler: authenticateBearer,
    schema: {
      description: 'Delete a user profile by id',
      summary: 'Delete a user profile by id',
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
  }, deleteUserProfileHandler);
}