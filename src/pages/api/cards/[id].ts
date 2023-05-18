import { NextApiResponse, NextApiRequest } from 'next';
import nextConnect from 'next-connect';

import upload from '@/config/upload';
import DiskStorageProvider from '@/providers/DiskStorageProvider';

// import authSession from '@/middlewares/authSession';

import '@/config/database';
import Card from '@/models/Card';

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

const storageProvider = new DiskStorageProvider();

// apiRoute.use(authSession);

apiRoute
  .use(upload.multer.single('img'))
  .put(async (req: RequestWithFiles, res) => {
    const { id } = req.query;
    const img = req.file;

    const findCard = await Card.findById(id);

    if (!findCard)
      return res.status(404).json({ message: 'Carta não encontrada' });

    let fileName = findCard.imgUrl;

    if (img) {
      await storageProvider.deleteFile(fileName);

      fileName = await storageProvider.saveFile(img.filename);
    }

    const updatedCard = {
      ...req.body,
      imgUrl: fileName,
    };

    await Card.updateOne(findCard, { $set: updatedCard });

    return res.json(Object.assign(findCard, updatedCard));
  });

apiRoute.get(async (req, res) => {
  const { id } = req.query;

  const findCard = await Card.findById(id);

  if (!findCard)
    return res.status(404).json({ message: 'Carta não encontrada' });

  return res.json(findCard);
});

apiRoute.delete(async (req, res) => {
  const { id } = req.query;

  const findCard = await Card.findById(id);

  if (!findCard)
    return res.status(404).json({ message: 'Carta não encontrada' });

  await Card.deleteOne(findCard);
  await storageProvider.deleteFile(findCard.imgUrl);

  return res.send(204);
});

export default apiRoute;
