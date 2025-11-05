import { FastifyRequest, FastifyReply, HookHandlerDoneFunction } from 'fastify';
import { supabase } from '../config/supabase';

export const authenticateApiKey = (request: FastifyRequest, reply: FastifyReply, done: HookHandlerDoneFunction) => {
  const apiKey = request.headers['x-api-key'];
  const expectedApiKey = process.env.API_UPLOAD_KEY;

  if (!apiKey || apiKey !== expectedApiKey) {
    reply.status(401).send({ message: 'Unauthorized: Invalid or missing API Key' });
    return;
  }
  done();
};

export const authenticateBearer = async (request: FastifyRequest, reply: FastifyReply) => {
  const authHeader = request.headers.authorization;
  
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return reply.status(401).send({ message: "Unauthorized: Missing or invalid token" });
  }

  const token = authHeader.replace("Bearer ", "");
  const { data, error } = await supabase.auth.getUser(token);
  
  if (error || !data.user) {
    return reply.status(401).send({ message: "Unauthorized" });
  }
  
  request.user = data.user;
};