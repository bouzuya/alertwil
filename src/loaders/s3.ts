import * as AWS from 'aws-sdk';
import { Promise } from '../globals';
import { Config } from '../models';

const load = ({
  bucket,
  key,
  accessKeyId,
  secretAccessKey,
  region
}: {
  bucket: string;
  key: string;
  accessKeyId: string;
  secretAccessKey: string;
  region?: string;
}): Promise<Config> => {
  const s3 = new AWS.S3({
    accessKeyId, secretAccessKey,
    region: region || 'ap-northeast-1',
    apiVersion: '2006-03-01'
  });
  s3.getObject({ Bucket: bucket, Key: key }).promise().then((data) => {
    return JSON.parse(data.Body);
  });
};

export { load };
