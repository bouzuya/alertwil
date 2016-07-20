import * as bodyParser from 'koa-bodyparser';
import * as koaLogger from 'koa-logger';
import { koa } from './koa';
import { routes } from './routes';
import { actions } from './actions';
import { load as loadConfig } from './config';

const server = (): void => {
  loadConfig({
    loader: 'fs',
    loaderOptions: { file: '_config.json' }
  }).then((groups) => {
    const app = koa();
    app.use(koaLogger());
    app.use(bodyParser());
    app.use(routes());
    app.use(actions(groups));
    app.listen(3000);
  });
};

export { server };
