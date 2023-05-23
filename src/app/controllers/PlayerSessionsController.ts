import { Request, Response } from 'express';

import { sign } from 'jsonwebtoken';
import Player from '../models/Player';
import GameLog from '../models/GameLog';

export default {
  async store(req: Request, res: Response): Promise<Response> {
    const { nickname, password } = req.body;

    const findPlayer = await Player.findOne({ nickname });

    if (!findPlayer)
      return res.status(404).json({ message: 'Usuário não encontrado' });

    if (!(await findPlayer.validatePassword(password)))
      return res.status(404).json({ message: 'Usuário não encontrado' });

    const playerHistory = await GameLog.find({ ownerId: findPlayer.id });

    const { id, createdAt, updatedAt } = findPlayer;
    const secret = process.env.APP_SECRET as string;

    const token = sign({}, secret, {
      subject: id,
      expiresIn: '7d',
    });

    return res.json({
      user: {
        _id: id,
        nickname,
        createdAt,
        updatedAt,
      },
      historyOfGames: playerHistory,
      token,
    });
  },
};
