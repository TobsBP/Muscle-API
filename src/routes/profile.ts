import { authenticateApiKey } from '../middleware/auth'
import type { FastifyTypedInstance } from '../types'
import z from 'zod'
import { getUsersProfiles, updateUserProfile, deleteUserProfile } from '../repositories/profile';
import { deleteUserProfileHandler, getProfileHandler, updateProfileHandler } from '../controllers/profile';

export async function profileRoutes(server: FastifyTypedInstance) {
  server.get('/userProfile/:id', {
  preHandler: authenticateApiKey,
  schema: {
    description: 'Get the user profile based on the id',
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
    preHandler: authenticateApiKey,
    schema: {
      description: 'Get all users profiles',
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
  }, async (request, reply) => {
    try {
      const profile = await getUsersProfiles()
      
      return reply.status(200).send({ message: profile })
    } catch (error) {
      return reply.status(400).send({ message: 'Error' })
    }
  })

  server.put('/userProfile/:id', {
    preHandler: authenticateApiKey,
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
    preHandler: authenticateApiKey,
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