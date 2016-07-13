import { G, C } from './koa';
import * as koaRouter from 'koa-router';

const routes = (): any => {
  const router = koaRouter();

  router.post('/groups/:id/alerts', function* <T>(next: G<T>): G<G<T>> {
    const groupId: string = this.params.id;
    const context: C = this;
    context.response.body = 'POST /groups/:id/alerts groupId=' + groupId;
  });

  router.get('/alerts/:id', function* <T>(next: G<T>): G<G<T>> {
    const alertId: string = this.params.id;
    const context: C = this;
    context.response.body = 'GET /alerts/:id alertId=' + alertId;
  });

  router.post('/alerts/:id/results', function* <T>(next: G<T>): G<G<T>> {
    const alertId: string = this.params.id;
    const context: C = this;
    context.response.body = 'POST /alerts/:id/results alertId=' + alertId;
  });

  return router.routes();
};

export { routes };
