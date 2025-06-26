import express from 'express';
import { UserRouters } from '../modules/User/user.routes';
import path from 'path';
import { AuthRouters } from '../modules/Auth/auth.routes';

const router = express.Router();

const moduleRoutes = [
  {
    path: '/user',
    route: UserRouters,
  },
  {
    path: '/auth',
    route: AuthRouters,
  },
];

moduleRoutes.forEach(route => router.use(route.path, route.route));

export default router;
