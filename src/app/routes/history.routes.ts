import { Router } from 'express';

import HistoryController from '../controllers/HistoryController';

const historyRoutes = Router();

historyRoutes.get('/', HistoryController.index);
historyRoutes.post('/', HistoryController.store);
historyRoutes.get('/:userId', HistoryController.getHistoryByUserId);

export default historyRoutes;
