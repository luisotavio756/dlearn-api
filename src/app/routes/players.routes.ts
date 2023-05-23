import { Router } from 'express';

import PlayersController from '../controllers/PlayersController';
import PlayerSessionsController from '../controllers/PlayerSessionsController';

const playersRoutes = Router();

playersRoutes.post('/session', PlayerSessionsController.store);
playersRoutes.post('/', PlayersController.store);

export default playersRoutes;
