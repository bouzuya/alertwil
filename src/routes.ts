import express from 'express';

type ActionName = string & { _: 'ActionName' };
type RoutedRequest = express.Request & { actionName?: ActionName; }

const routes = (): express.Router => {
  const router = express.Router({ caseSensitive: true, strict: true });
  const action = (name: string): express.RequestHandler =>
    (request, _response, next) => {
      (request as RoutedRequest).actionName = name as ActionName;
      next();
    };
  router.post('/groups/:id/alerts', action('alerts#create'));
  router.get('/alerts/:id', action('alerts#show'));
  router.post('/alerts/:id/results', action('alert/results#create'));
  return router;
};

export { ActionName, RoutedRequest, routes };
