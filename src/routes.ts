import * as koaRouter from 'koa-router';
import { createAlert, showAlert, createAlertResult } from './actions';

const routes = (): any => {
  const router = koaRouter();
  router.post('/groups/:id/alerts', createAlert);
  router.get('/alerts/:id', showAlert);
  router.post('/alerts/:id/results', createAlertResult);
  return router.routes();
};

export { routes };
