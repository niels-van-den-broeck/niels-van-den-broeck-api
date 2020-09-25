import registerBlogPostRoutes from './blogposts';
import { RouteRegistration } from '../../../@types/RouteRegistrationHandler';

const registerRoutes: RouteRegistration = (router) => {
  registerBlogPostRoutes(router);
};

export default registerRoutes;
