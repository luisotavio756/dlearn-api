import { Request, Response } from 'express';

import GameLog from '../models/GameLog';

export default {
  async index(req: Request, res: Response): Promise<Response> {
    const logs = await GameLog.find();
    const orderedLogs = [...logs].sort((a, b) => b.winnerScore - a.winnerScore);

    return res.json(orderedLogs);
  },

  async store(req: Request, res: Response): Promise<Response> {
    const { winnerName, winnerScore, startedAt, endAt, ownerName, ownerId, ownerScore, ownerPlacing } =
      req.body;

    const gameLog = await GameLog.create({
      winnerName,
      winnerScore,
      startedAt,
      endAt,
      ownerName,
      ownerId,
      ownerScore,
      ownerPlacing
    });

    return res.json(gameLog);
  },
};
