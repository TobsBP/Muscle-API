import type { FastifyTypedInstance } from '../types'
import { exerciseRoutes } from './exercises'
import { workoutRoutes } from './workouts';

export async function routes(server: FastifyTypedInstance) {
  server.register(exerciseRoutes);
  server.register(workoutRoutes);
}