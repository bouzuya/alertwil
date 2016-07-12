import * as koa from 'koa';

type G<T> = IterableIterator<T>;
type C = {
  // TODO
  body: string;
};

const server = (): void => {
  const app = koa();

  // logger
  app.use(function* <T>(next: G<T>): G<G<T>> {
    const start = new Date().getTime();
    yield next;
    const ms = new Date().getTime() - start;
    console.log('%s %s - %s', this.method, this.url, ms);
  });

  // response
  app.use(function* <T>(): G<T> {
    const context: C = this;
    context.body = 'Hello World';
  });

  app.listen(3000);
};

export { server };
