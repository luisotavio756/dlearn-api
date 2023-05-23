import { Request, Response } from 'express';

import User from '../models/User';

export default {
  async store(req: Request, res: Response): Promise<Response> {
    const { name, login, password } = req.body;

    const findUser = await User.findOne({ login });

    if (findUser) {
      return res.status(400).json({ message: 'Usuário já criado' });
    }

    const user = await User.create({
      login,
      name,
      password,
    });

    return res.json({
      _id: user.id,
      name,
      login,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    });
  },
};
