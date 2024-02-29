import { Router } from 'express';

import HistoryController from '../controllers/HistoryController';

const historyRoutes = Router();

historyRoutes.get('/', HistoryController.index);
historyRoutes.post('/', HistoryController.store);

export default historyRoutes;
