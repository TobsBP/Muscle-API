import { getWorkout, getWorkouts, updateWorkout, deleteWorkout } from '../repositories/workouts';
import { FastifyRequest, FastifyReply } from 'fastify';

export async function getWorkoutsHandler(request: FastifyRequest, reply: FastifyReply) {
    try {
      const response = await getWorkouts();

      return reply.status(200).send({ message: response });
    } catch (error) {
      console.log(error);

      return reply.status(200).send({ message: "Error to fetch" })      
    }
}

export async function getWorkoutHandler(request: FastifyRequest<{ Querystring: { id: number } }>, reply: FastifyReply) {
    try {
      const response = await getWorkout(request.query.id);

      return reply.status(200).send({ message: response });
    } catch (error) {
      console.log(error);

      return reply.status(200).send({ message: "Error to fetch" })      
    }
}

export async function updateWorkoutHandler(request: FastifyRequest, reply: FastifyReply) {
    try {
      const { id } = request.params as { id: number };
      const workout = request.body as { workout: any };

      const response = await updateWorkout(id, workout);

      return reply.status(200).send({ message: response });
    } catch (error) {
      console.log(error);

      return reply.status(400).send({ message: "Error to fetch" })      
    }
}

export async function deleteWorkoutHandler(request: FastifyRequest, reply: FastifyReply) {
    try {
      const { id } = request.params as { id: number };
    
      const response = await deleteWorkout(id);

      return reply.status(200).send({ message: response });
    } catch (error) {
      console.log(error);

      return reply.status(400).send({ message: "Error to fetch" })      
    }
}
