import { getExercises, getExercise, updateExercise, deleteExercise } from '../repositories/exercises';
import { FastifyRequest, FastifyReply } from 'fastify';

export async function getExerciseHandler(request: FastifyRequest<{ Querystring: { id: number } }>, reply: FastifyReply) {
    try {
      const exercise = await getExercise(request.query.id); 

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

export async function updateExerciseHandler(request: FastifyRequest<{ Params: { id: number }, Body: any }>, reply: FastifyReply) {
    try {
      const exercise = await updateExercise(request.params.id, request.body); 

      return reply.status(200).send({ message: exercise });
    } catch (error) {
      
      console.error("error:", error);

      return reply.status(500).send({ message: "Failed" });
    }
}

export async function deleteExerciseHandler(request: FastifyRequest<{ Params: { id: number } }>, reply: FastifyReply) {
    try {
      const exercise = await deleteExercise(request.params.id); 

      return reply.status(200).send({ message: exercise });
    } catch (error) {
      
      console.error("error:", error);

      return reply.status(500).send({ message: "Failed" });
    }
}
