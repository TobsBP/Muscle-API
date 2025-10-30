import { getUserProfile, getUsersProfiles } from '../repositories/profile'
import { authenticateApiKey } from '../middleware/auth'
import type { FastifyTypedInstance } from '../types'
import z from 'zod'

export async function profileRoutes(server: FastifyTypedInstance) {
  server.get('/userProfile', {
    preHandler: authenticateApiKey,
    schema: {
      description: 'Get the user profile based on the id',
      querystring: z.object({
        id: z.uuid(),
      }),
      response: {
        200: z.object({
          message: z.unknown()
        }),
        400: z.object({
          message: ['Error']
        })
      }
    }
  }, async(request, reply) => {
    try {
      const profile = await getUserProfile(request.query.id)
      
      return reply.status(200).send({ message: profile })
    } catch (error) {
      return reply.status(400).send({ message: 'Error' })
    }
  })
  
  server.get('/usersProfiles', {
    preHandler: authenticateApiKey,
    schema: {
      description: 'Get all users profiles',
      response: {
        200: z.object({
          message: z.unknown()
        }),
        400: z.object({
          message: ['Error']
        })
      }
    }
  }, async(request, reply) => {
    try {
      const profile = await getUsersProfiles()
      
      return reply.status(200).send({ message: profile })
    } catch (error) {
      return reply.status(400).send({ message: 'Error' })
    }
  })
}