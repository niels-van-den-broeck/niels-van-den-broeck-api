import registerPostRoute from './post';
import { RouteRegistration } from '../../../../@types/RouteRegistrationHandler';

const registerRoutes: RouteRegistration = server => {
  registerPostRoute(server);
};

export default registerRoutes;
