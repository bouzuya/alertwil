import { koa, G } from './koa';
import { routes } from './routes';

const server = (): void => {
  const app = koa();

  // logger
  app.use(function* <T>(next: G<T>): G<G<T>> {
    const start = new Date().getTime();
    yield next;
    const ms = new Date().getTime() - start;
    console.log('%s %s - %s', this.method, this.url, ms);
  });

  app.use(routes());

  app.listen(3000);
};

export { server };
