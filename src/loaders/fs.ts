import * as fs from 'fs';
import { Config } from '../models';

const load = ({ file }: { file: string; }): Promise<Config> => {
  const s = fs.readFileSync(file, { encoding: 'utf-8' });
  return Promise.resolve(JSON.parse(s));
};

export { load };
