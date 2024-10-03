import { FastifyPluginCallback } from "fastify";

type FastifyConvictEnv =
  FastifyPluginCallback<fastifyConvictEnv.FastifyConvictEnvOptions>;

declare namespace fastifyConvictEnv {
  export interface FastifyConvictEnvOptions {
    schema: Record<string, any>;
  }

  export const fastifyConvictEnv: FastifyConvictEnv;
  export { fastifyConvictEnv as default };
}

declare function fastifyConvictEnv(
  ...params: Parameters<FastifyConvictEnv>
): ReturnType<FastifyConvictEnv>;
export = fastifyConvictEnv;
