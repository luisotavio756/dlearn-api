import { Router } from 'express';

import authSession from '../middlewares/authSession';
import CardsController from '../controllers/CardsController';
import upload from '../config/upload';

const cardsRoutes = Router();

cardsRoutes.get('/:language', CardsController.index);
cardsRoutes.get('/:language/:id', CardsController.show);

cardsRoutes.use(authSession);

cardsRoutes.post('/', upload.multer.single('img'), CardsController.store);
cardsRoutes.put('/:id', upload.multer.single('img'), CardsController.update);
cardsRoutes.delete('/:id', CardsController.delete);

export default cardsRoutes;
