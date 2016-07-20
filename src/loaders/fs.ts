import * as fs from 'fs';
import { Config } from '../models';

const load = ({ file }: { file: string; }): Config => {
  const s = fs.readFileSync(file, { encoding: 'utf-8' });
  return JSON.parse(s);
};

export { load };
