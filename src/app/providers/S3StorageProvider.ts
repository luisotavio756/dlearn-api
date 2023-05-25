import fs from 'fs';
import path from 'path';
import * as aws from '@aws-sdk/client-s3';
import mime from 'mime';
import upload from '../config/upload';

class S3StorageProvider {
  private client: aws.S3Client;

  constructor() {
    this.client = new aws.S3Client({
      region: process.env.AWS_REGION as string,
      credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID as string,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY as string,
      },
    });
  }

  public async saveFile(file: string): Promise<string> {
    const originalPath = path.resolve(upload.tmpFolder, file);

    const ContentType = mime.getType(originalPath);

    if (!ContentType) {
      throw new Error('File not found !');
    }

    const fileContent = await fs.promises.readFile(originalPath);

    const uploadCommand = new aws.PutObjectCommand({
      Bucket: upload.aws.bucket,
      Key: file,
      ACL: 'public-read',
      Body: fileContent,
      ContentType,
    });

    await this.client.send(uploadCommand);

    await fs.promises.unlink(originalPath);

    return file;
  }

  public async deleteFile(file: string): Promise<void> {
    const deleteCommand = new aws.DeleteObjectCommand({
      Bucket: upload.aws.bucket,
      Key: file,
    });

    await this.client.send(deleteCommand);
  }
}

export default S3StorageProvider;
