import multer, { diskStorage,Multer } from 'multer';
import path from 'path';
import crypto from 'crypto';

const tmpFolder = path.resolve(__dirname, '..', '..', '..', '..', 'tmp');

interface IUploadConfig {
  tmpFolder: string;
  uploadsFolder: string;
  multer: Multer;
}

export default {
  tmpFolder,
  uploadsFolder: path.resolve('./public', 'cards-images'),

  multer: multer({
    storage: diskStorage({
      destination: tmpFolder,
      filename: (request, file, callback) => {
        const fileHash = crypto.randomBytes(10).toString('hex');

        const fileName = `${fileHash}-${file.originalname.trim()}`;

        return callback(null, fileName);
      },
    })
  }),
} as IUploadConfig;
