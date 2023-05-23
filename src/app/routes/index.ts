import { Router } from 'express';

import usersRouter from './users.routes';
import cardsRoutes from './cards.routes';
import historyRoutes from './history.routes';

const routes = Router();

routes.use('/users', usersRouter);
routes.use('/cards', cardsRoutes);
routes.use('/history', historyRoutes);

export default routes;
