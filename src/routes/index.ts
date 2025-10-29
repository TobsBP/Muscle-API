import type { FastifyTypedInstance } from '../types'
import { exerciseRoutes } from './exercises'

export async function routes(server: FastifyTypedInstance) {
  server.register(exerciseRoutes);
}