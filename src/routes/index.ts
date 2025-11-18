import type { FastifyTypedInstance } from '../types'
import { authRoutes } from './auth';
import { exerciseRoutes } from './exercises'
import { profileRoutes } from './profile';
import { trainingSheetRoutes } from './trainingSheet';
import { waitingRoutes } from './waiting';
import { workoutRoutes } from './workouts';

export async function routes(server: FastifyTypedInstance) {
  server.register(authRoutes);
  server.register(exerciseRoutes);
  server.register(workoutRoutes);
  server.register(profileRoutes);
  server.register(trainingSheetRoutes);
  server.register(waitingRoutes);
}