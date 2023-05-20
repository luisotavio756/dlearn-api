/* eslint-disable no-console */
import { NextApiResponse, NextApiRequest } from 'next';
import nextConnect from 'next-connect';

import authSession from '@/middlewares/authSession';
import GameLog from '@/models/GameLog';
import '@/config/database';

const apiRoute = nextConnect<NextApiRequest, NextApiResponse>({
  // Handle any other HTTP method
  onNoMatch(req, res) {
    res.status(405).json({ error: `Method '${req.method}' Not Allowed` });
  },
  onError: (err, req, res) => {
    console.log(err);

    return res
      .status(500)
      .json({ message: 'Ocorreu um erro ao tentar comparar as imagens' });
  },
});

apiRoute.get(async (_, res) => {
  const logs = await GameLog.find();
  const orderedLogs = [...logs].sort((a, b) => b.winnerScore - a.winnerScore);

  return res.json(orderedLogs);
});

apiRoute.use(authSession);

apiRoute.post(async (req, res) => {
  const { winnerName, winnerScore, startedAt, endAt, ownerName, ownerId } =
    req.body;

  const gameLog = await GameLog.create({
    winnerName,
    winnerScore,
    startedAt,
    endAt,
    ownerName,
    ownerId,
  });

  return res.json(gameLog);
});

export default apiRoute;
