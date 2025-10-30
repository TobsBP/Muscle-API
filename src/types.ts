import type { FastifyBaseLogger, FastifyInstance, RawReplyDefaultExpression, RawRequestDefaultExpression, RawServerDefault } from "fastify"
import type { ZodTypeProvider } from "fastify-type-provider-zod"
import { User } from "@supabase/supabase-js";

declare module 'fastify' {
  interface FastifyRequest {
    user?: User
  }
}

export type FastifyTypedInstance = FastifyInstance<
  RawServerDefault,
  RawRequestDefaultExpression,
  RawReplyDefaultExpression,
  FastifyBaseLogger,
  ZodTypeProvider
>