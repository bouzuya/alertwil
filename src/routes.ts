import { G } from './koa';
import * as koaRouter from 'koa-router';

const routes = (): any => {
  const routesConfig = [
    ['post', '/groups/:id/alerts', 'alerts#create'],
    ['get', '/alerts/:id', 'alerts#show'],
    ['post', '/alerts/:id/results', 'alert/results#create']
  ];
  const router = koaRouter();
  routesConfig.forEach(([method, path, name]) => {
    router[method](path, function* <T>(next: G<T>): G<G<T>> {
      this.request.params.name = name;
      yield next;
    });
  });
  return router.routes();
};

export { routes };
