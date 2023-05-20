/* eslint-disable no-console */
import { NextApiResponse, NextApiRequest } from 'next';
import nextConnect from 'next-connect';

import '@/config/database';
import User from '@/models/User';

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

apiRoute.post(async (req, res) => {
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
});

export default apiRoute;
