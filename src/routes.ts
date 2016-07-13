import { G } from './koa';
import { createAlert, showAlert, createAlertResult } from './controllers';
import * as koaRouter from 'koa-router';

const routes = (): any => {
  const router = koaRouter();

  router.post('/groups/:id/alerts', function* <T>(next: G<T>): G<G<T>> {
    const groupId: string = this.params.id;
    createAlert(groupId);
  });

  router.get('/alerts/:id', function* <T>(next: G<T>): G<G<T>> {
    const alertId: string = this.params.id;
    showAlert(alertId);
  });

  router.post('/alerts/:id/results', function* <T>(next: G<T>): G<G<T>> {
    const alertId: string = this.params.id;
    createAlertResult(alertId);
  });

  return router.routes();
};

export { routes };
