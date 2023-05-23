import { Router } from 'express';

import SessionController from '../controllers/SessionController';
import UsersController from '../controllers/UsersController';

const userRoutes = Router();

userRoutes.post('/session', SessionController.store);
userRoutes.post('/', UsersController.store);

export default userRoutes;
