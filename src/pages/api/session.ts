import { sign } from 'jsonwebtoken';
import { NextApiRequest, NextApiResponse } from 'next';

import User from '@/models/User';

import '@/config/database';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const { login, password } = req.body;

  const findUser = await User.findOne({ login });

  if (!findUser)
    return res.status(404).json({ message: 'Usuário não encontrado' });

  if (!(await findUser.validatePassword(password)))
    return res.status(404).json({ message: 'Usuário não encontrado' });

  const { id, name, createdAt, updatedAt } = findUser;
  const secret = process.env.APP_SECRET as string;

  const token = sign({}, secret, {
    subject: id,
    expiresIn: '7d',
  });

  return res.json({
    _id: id,
    name,
    login,
    createdAt,
    updatedAt,
    token,
  });
}
