import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { UserControllers } from './user.controller';
import { userValidation } from './user.validation';

const router = express.Router();

router.post(
  '/register',
  validateRequest(userValidation.registerUser),
  UserControllers.registerUser,
);

export const UserRouters = router;
