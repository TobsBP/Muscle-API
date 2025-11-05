import { getExercises, getExercise, updateExercise, deleteExercise } from '../repositories/exercises';
import { FastifyRequest, FastifyReply } from 'fastify';

export async function getExerciseHandler(request: FastifyRequest, reply: FastifyReply) {
    try {
      const { id } = request.query as { id: number }
      const exercise = await getExercise(id); 

      return reply.status(200).send({ message: exercise });
    } catch (error) {
      
      console.error("error:", error);

      return reply.status(500).send({ message: "Failed" });
    }
}

export async function getExercisesHandler(request: FastifyRequest, reply: FastifyReply) {
    try {
      const exercise = await getExercises(); 

      return reply.status(200).send({ message: exercise });
    } catch (error) {
      
      console.error("error:", error);

      return reply.status(500).send({ message: "Failed" });
    }
}

export async function updateExerciseHandler(request: FastifyRequest, reply: FastifyReply) {
    try {
      const { id } = request.query as { id: number };

      const exercise = await updateExercise(id, request.body); 

      return reply.status(200).send({ message: exercise });
    } catch (error) {
      
      console.error("error:", error);

      return reply.status(500).send({ message: "Failed" });
    }
}

export async function deleteExerciseHandler(request: FastifyRequest, reply: FastifyReply) {
    try {
      const { id } = request.query as { id: number };

      const exercise = await deleteExercise(id); 

      return reply.status(200).send({ message: exercise });
    } catch (error) {
      
      console.error("error:", error);

      return reply.status(500).send({ message: "Failed" });
    }
}
