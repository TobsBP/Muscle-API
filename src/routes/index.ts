import type { FastifyTypedInstance } from '../types'
import { authRoutes } from './auth';
import { exerciseRoutes } from './exercises'
import { workoutRoutes } from './workouts';

export async function routes(server: FastifyTypedInstance) {
  server.register(authRoutes);
  server.register(exerciseRoutes);
  server.register(workoutRoutes);
}