import * as bodyParser from 'koa-bodyparser';
import { koa, G } from './koa';
import { routes } from './routes';
import { actions } from './actions';

const server = (): void => {
  const app = koa();

  // logger
  app.use(function* <T>(next: G<T>): G<G<T>> {
    const start = new Date().getTime();
    yield next;
    const ms = new Date().getTime() - start;
    console.log('%s %s - %s', this.method, this.url, ms);
  });

  app.use(bodyParser());

  app.use(routes());

  app.use(actions());

  app.listen(3000);
};

export { server };
