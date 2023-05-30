import { Router } from 'express';

import usersRouter from './users.routes';
import cardsRoutes from './cards.routes';
import historyRoutes from './history.routes';
import playersRoutes from './players.routes';

const routes = Router();

routes.use('/users', usersRouter);
routes.use('/cards', cardsRoutes);
routes.use('/history', historyRoutes);
routes.use('/players', playersRoutes);

export default routes;
