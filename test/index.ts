import { Test, run } from 'beater';
import { tests as repositoriesTests } from './repositories';
import { tests as viewsTests } from './views';

const tests = ([] as Test[])
  .concat(repositoriesTests)
  .concat(viewsTests);

run(tests).catch(() => process.exit(1));
