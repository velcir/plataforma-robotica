import * as AWS from 'aws-sdk';
import * as fs from 'fs';

interface IAWSConfig {
  accessKeyId: string;
  secretAccessKey: string;
  region: string;
  bucket: string;
}

let s3bucket;

export function inicializar(config: IAWSConfig) {
  AWS.config.credentials = new AWS.Credentials(config.accessKeyId, config.secretAccessKey);
  AWS.config.region = config.region;

  s3bucket = new AWS.S3({ params: { Bucket: config.bucket } });
  s3bucket.createBucket();
}

export async function enviarVideo(path) {
  return new Promise<string>((resolve, reject) => {
    fs.readFile(path, (e1, file) => {
      if (e1) {
        reject(e1);
      } else {
        s3bucket.upload({ Body: file, Key: path, ACL: 'public-read' }, (e2, data) => {
          if (e2) {
            reject(e2);
          } else {
            fs.unlink(path);
            resolve(data.Location);
          }
        });
      }
    });
  });
}
