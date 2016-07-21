import * as bodyParser from 'koa-bodyparser';
import * as koaLogger from 'koa-logger';
import { koa, G } from './koa';
import { routes } from './routes';
import { actions } from './actions';
import { load as loadConfig } from './config';

const server = (): void => {
  loadConfig({
    loader: process.env.LOADER_TYPE,
    loaderOptions: JSON.parse(
      process.env.LOADER_OPTIONS ? process.env.LOADER_OPTIONS : '{}'
    )
  }).then((groups) => {
    const app = koa();
    app.use(koaLogger());
    app.use(bodyParser());
    app.use(routes());
    app.use(function* <T>(next: G<T>): G<G<T>> {
      const actionName: string = this.actionName;
      const params: string = JSON.stringify(this.params);
      console.log(`  action name=${actionName}, params=${params}`);
      yield next;
    });
    app.use(actions(groups));
    app.listen(parseInt(process.env.PORT ? process.env.PORT : '3000', 10));
  }, (error) => {
    console.error(error);
  });
};

export { server };
