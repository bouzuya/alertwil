import express from 'express';
import morgan from 'morgan';
import { routes, RoutedRequest } from './routes';
import { actions } from './actions';
import { load as loadConfig } from './config';

const server = async (): Promise<void> => {
  const loaderTypeOrUndefined = process.env.LOADER_TYPE;
  const loaderType =
    loaderTypeOrUndefined === 'fs'
      ? 'fs'
      : loaderTypeOrUndefined === 's3'
        ? 's3'
        : 'fs';
  const groups = await loadConfig({
    loader: loaderType,
    loaderOptions: JSON.parse(
      process.env.LOADER_OPTIONS ? process.env.LOADER_OPTIONS : '{}'
    )
  });
  console.log(`config: ${JSON.stringify(groups)}`);
  const app = express();
  app.use(morgan('combined'));
  app.use(express.json());
  app.use(express.urlencoded({ extended: false }));
  app.use(routes());
  app.use((request: RoutedRequest, _, next) => {
    const actionName = request.actionName;
    if (typeof actionName !== 'undefined') {
      const params = JSON.stringify(request.params);
      const body = JSON.stringify(request.body);
      console.log(`  action name=${actionName}, params=${params}, body=${body}`);
    }
    next();
  });
  app.use(actions(groups));
  const port = parseInt(process.env.PORT ? process.env.PORT : '3000', 10);
  await new Promise((resolve) => void app.listen(port, resolve));
  console.log(`start: port=${port}`);
};

export { server };
