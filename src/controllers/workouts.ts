import { getWorkout, getWorkouts, updateWorkout, deleteWorkout, updateStatus } from '../repositories/workouts';
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

export async function getWorkoutHandler(request: FastifyRequest, reply: FastifyReply) {
    try {
      const { id } = request.params as { id: string };

      const response = await getWorkout(id);

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

export async function updateWorkoutStatusHandler(request: FastifyRequest, reply: FastifyReply) {
    try {
      const { id } = request.params as { id: number };

      const response = await updateStatus(id);

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
