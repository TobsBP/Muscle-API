import { FastifyRequest, FastifyReply } from 'fastify';
import { getUserProfile, getUsersProfiles, updateUserProfile, deleteUserProfile } from '../repositories/profile';

export async function getProfileHandler(request: FastifyRequest, reply: FastifyReply) {
  try {
    const id = (request.params) as string; 
    const profile = getUserProfile(id) 

    return reply.status(200).send({ message: profile });
  } catch (error) {
    
    console.error("error:", error);

    return reply.status(500).send({ message: "Failed" });
  }
}

export async function getProfilesHandler(reply: FastifyReply) {
  try {
    const profiles = await getUsersProfiles(); 

    return reply.status(200).send({ message: profiles });
  } catch (error) {
    
    console.error("error:", error);

    return reply.status(500).send({ message: "Failed" });
  }
}

export async function updateProfileHandler(request: FastifyRequest, reply: FastifyReply) {
  try {
    const { id } = request.params as { id: string };
    const { profile } = request.body as { profile: any };

    const response = await updateUserProfile(id, profile);

    return reply.status(200).send({ message: response });
  } catch (error) {
    console.error("error:", error);
    return reply.status(500).send({ message: "Failed" });
  }
}

export async function deleteUserProfileHandler(request: FastifyRequest, reply: FastifyReply) {
 try {
    const { id } = request.params as { id: string };
    
    const response = await deleteUserProfile(id);
    
    return reply.status(200).send({ message: response });
  } catch (error) {
    console.error("error:", error);
    return reply.status(500).send({ message: "Failed" });
  }
}