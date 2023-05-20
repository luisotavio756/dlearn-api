/* eslint-disable no-console */
import { NextApiResponse, NextApiRequest } from 'next';
import nextConnect from 'next-connect';

import upload from '@/config/upload';
import DiskStorageProvider from '@/providers/DiskStorageProvider';
import authSession from '@/middlewares/authSession';
import Card from '@/models/Card';
import '@/config/database';

interface File {
  filename: string;
  fieldname: string;
  originalname: string;
  encoding: string;
  mimetype: string;
  buffer: Buffer;
  size: number;
}

interface RequestWithFiles extends NextApiRequest {
  file: File;
}

export const config = {
  api: {
    bodyParser: false,
  },
};

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
  const cards = await Card.find();

  return res.json(cards);
});

apiRoute.use(authSession);

apiRoute
  .use(upload.multer.single('img'))
  .post(async (req: RequestWithFiles, res) => {
    const img = req.file;

    const storageProvider = new DiskStorageProvider();
    const fileName = await storageProvider.saveFile(img.filename);

    const card = await Card.create({
      ...req.body,
      imgUrl: fileName,
    });

    return res.json(card);
  });

export default apiRoute;
