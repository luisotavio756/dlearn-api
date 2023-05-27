import upload from '../config/upload';

export function getFinalUrl(imgUrl: string) {
  return `https://${upload.aws.bucket}.s3.amazonaws.com/${imgUrl}`;
}
