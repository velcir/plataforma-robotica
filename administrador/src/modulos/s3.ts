import * as AWS from 'aws-sdk';
import * as fs from 'fs';

interface IAWSConfig {
  accessKeyId: string,
  secretAccessKey: string,
  region: string,
  bucket: string
}

let s3bucket;

export function inicializar(config: IAWSConfig) {
  AWS.config.credentials = new AWS.Credentials(config.accessKeyId, config.secretAccessKey);
  AWS.config.region = config.region;

  s3bucket = new AWS.S3({params: {Bucket: config.bucket}});
  s3bucket.createBucket();
}

export async function enviarVideo(path, key) {
  return new Promise((resolve, reject) => {
    fs.readFile(path, (err, file) => {
      if (err) reject(err);
      else
        s3bucket.upload({Body: file, Key: key, ACL:'public-read'}, (err, data) => {
          if (err) reject(err);
          else {
            fs.unlink(path);
            resolve(data.Location);
          }
        });
    });
  });
}
