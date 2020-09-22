import { FastifyInstance } from 'fastify';

export type RouteRegistration = {
  (router: FastifyInstance): void;
};
