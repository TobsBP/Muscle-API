import { getTrainingSheet, deleteTrainingSheet } from '../repositories/trainingSheet';
import { FastifyRequest, FastifyReply } from 'fastify';

export async function getTrainingSheetHandle(request: FastifyRequest, reply: FastifyReply) {
  try {
    const { id } = request.params as { id: string }; 
    const profile = await getTrainingSheet(id) 

    return reply.status(200).send({ message: profile });
  } catch (error) {
    
    console.error("error:", error);

    return reply.status(500).send({ message: "Failed" });
  }
}

export async function deleteTrainingSheetHandle(request: FastifyRequest, reply: FastifyReply) {
  try {
    const { id } = request.params as { id: string }; 
    const profiles = await deleteTrainingSheet(id); 

    return reply.status(200).send({ message: profiles });
  } catch (error) {
    
    console.error("error:", error);

    return reply.status(500).send({ message: "Failed" });
  }
}
