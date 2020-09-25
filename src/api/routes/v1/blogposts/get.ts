import { RouteRegistration } from '../../../../@types/RouteRegistrationHandler';

const registerRoute: RouteRegistration = (server) => {
  server.get('/blogposts', (req, res) => {
    res.send(200);
  });
};

export default registerRoute;
