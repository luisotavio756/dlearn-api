import { NextApiResponse, NextApiRequest } from 'next';
import nextConnect from 'next-connect';

import '@/config/database';
import Player from '@/models/Player';
import { isValid } from '@/utils/passwordUtils';

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
});

export default apiRoute;
