import { Router } from 'express';

export type RouteRegistration = {
  (router: Router): void;
};
