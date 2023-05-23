import { Request, Response } from 'express';

import Player from '../models/Player';
import { isValid } from '../utils/passwordUtils';

export default {
  async store(req: Request, res: Response): Promise<Response> {
    const { nickname, password } = req.body;

    if (!nickname || !password) {
      return res.status(400).json({ message: 'Dados incompletos!' });
    }

    if (!isValid(password)) {
      return res
        .status(400)
        .json({ message: 'A senha deve conter no mínimo 6 caracteres' });
    }

    const findPlayer = await Player.findOne({ nickname });

    if (findPlayer) {
      return res.status(400).json({ message: 'Jogador já criado' });
    }

    const player = await Player.create({
      nickname,
      password,
    });

    return res.json({
      _id: player.id,
      nickname,
      createdAt: player.createdAt,
      updatedAt: player.updatedAt,
    });
  },
};
