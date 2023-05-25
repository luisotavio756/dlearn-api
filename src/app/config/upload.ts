import multer, { diskStorage, Multer } from 'multer';
import path from 'path';
import crypto from 'crypto';

const tmpFolder = path.resolve(__dirname, '..', '..', '..', 'tmp');

interface IUploadConfig {
  tmpFolder: string;
  uploadsFolder: string;
  multer: Multer;
  aws: {
    bucket: string;
  };
}

export default {
  tmpFolder,
  uploadsFolder: path.resolve(tmpFolder, 'uploads'),

  multer: multer({
    storage: diskStorage({
      destination: tmpFolder,
      filename: (request, file, callback) => {
        const fileHash = crypto.randomBytes(10).toString('hex');

        const fileName = `${fileHash}-${file.originalname.trim()}`;

        return callback(null, fileName);
      },
    }),
  }),

  aws: {
    bucket: process.env.AWS_BUCKET,
  },
} as IUploadConfig;
