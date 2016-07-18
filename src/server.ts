import * as bodyParser from 'koa-bodyparser';
import * as koaLogger from 'koa-logger';
import { koa } from './koa';
import { routes } from './routes';
import { actions } from './actions';

const server = (): void => {
  const app = koa();
  app.use(koaLogger());
  app.use(bodyParser());
  app.use(routes());
  app.use(actions());
  app.listen(3000);
};

export { server };
