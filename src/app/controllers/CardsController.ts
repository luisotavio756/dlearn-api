import { Request, Response } from 'express';

import DiskStorageProvider from '../providers/DiskStorageProvider';
import Card from '../models/Card';

const storageProvider = new DiskStorageProvider();

export default {
  async store(req: Request, res: Response): Promise<Response> {
    const img = req.file;

    const fileName = await storageProvider.saveFile(img?.filename as string);

    const card = await Card.create({
      ...req.body,
      imgUrl: fileName,
    });

    return res.json(card);
  },

  async index(req: Request, res: Response): Promise<Response> {
    const cards = await Card.find();

    return res.json(cards);
  },

  async show(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;

    const findCard = await Card.findById(id);

    if (!findCard)
      return res.status(404).json({ message: 'Carta não encontrada' });

    return res.json(findCard);
  },

  async update(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;
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

    await Card.updateOne({ _id: findCard.id }, { $set: updatedCard });

    return res.json(Object.assign(findCard, updatedCard));
  },

  async delete(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;

    const findCard = await Card.findById(id);

    if (!findCard)
      return res.status(404).json({ message: 'Carta não encontrada' });

    await Card.deleteOne({ _id: findCard.id });
    await storageProvider.deleteFile(findCard.imgUrl);

    return res.send();
  },
};