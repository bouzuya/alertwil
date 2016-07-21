import * as AWS from 'aws-sdk';
import { Promise } from '../globals';
import { Config } from '../models';

export type S3LoaderOptions = {
  bucket: string;
  key: string;
  accessKeyId: string;
  secretAccessKey: string;
  region?: string;
}

const load = ({
  bucket,
  key,
  accessKeyId,
  secretAccessKey,
  region
}: S3LoaderOptions): Promise<Config> => {
  return new Promise((resolve, reject) => {
    const s3 = new AWS.S3({
      accessKeyId, secretAccessKey,
      region: region || 'ap-northeast-1',
      apiVersion: '2006-03-01'
    });
    return s3.getObject({ Bucket: bucket, Key: key }, (error, data) => {
      if (error) {
        reject(error);
      } else {
        resolve(JSON.parse(data.Body));
      }
    });
  });
};

export { load };
