import { getWaitingList, updateWaitingStatus } from '../repositories/waiting';
import { FastifyRequest, FastifyReply } from 'fastify';

export async function getWaitingHandle(request: FastifyRequest, reply: FastifyReply) {
  try {
    const { id } = request.params as { id: string }; 
    
    const { data, error } = await getWaitingList(id);

    if (error) {
      console.error("Supabase error:", error);
      return reply.status(500).send({ message: "Failed to retrieve waiting list" });
    }
    
    return reply.status(200).send({ message: data });
  } catch (error) {
    
    console.error("error:", error);

    return reply.status(500).send({ message: "Failed" });
  }
}

export async function updateWaitingStatusHandle(request: FastifyRequest, reply: FastifyReply) {
  try {
    const { id } = request.params as { id: string };
    const { status } = request.body as { status: boolean };

    const { data, error } = await updateWaitingStatus(id, status);

    if (error) {
      console.error("Supabase error:", error);
      return reply.status(500).send({ message: "Failed to update waiting status" });
    }

    if (!data) {
      return reply.status(404).send({ message: "Waiting list entry not found" });
    }

    return reply.status(200).send({ message: "Waiting status updated successfully", data });
  } catch (error) {
    console.error("Error:", error);
    return reply.status(500).send({ message: "Failed to update waiting status" });
  }
}