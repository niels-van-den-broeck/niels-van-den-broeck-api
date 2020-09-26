import registerUserRoutes from './user';
import { RouteRegistration } from '../../../@types/RouteRegistrationHandler';

const registerRoutes: RouteRegistration = (router) => {
  registerUserRoutes(router);
};

export default registerRoutes;
