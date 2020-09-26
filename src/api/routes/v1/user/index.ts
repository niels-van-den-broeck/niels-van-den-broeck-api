import { RouteRegistration } from '../../../../@types/RouteRegistrationHandler';

import registerPostRoute from './register.post';

const registerRoutes: RouteRegistration = (router) => {
  registerPostRoute(router);
};

export default registerRoutes;
