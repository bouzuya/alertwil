import * as koa from 'koa';
import { routes } from './routes';

type Response = {
  header: any;
  headers: any;
  socket: any;
  status: number;
  message: any;
  length: number;
  body: any;
  get: (field: string) => string;
  set: (field: string | Object, value?: string) => void;
  append: (field: string, value: string) => void;
  remove: (field: string) => void;
  type: string;
  is: (...types: any[]) => boolean;
  redirect: (url: string, alt?: string) => void;
  attachment: (filename?: string) => void;
  headerSent: any;
  lastModified: Date;
  etag: any;
  vary: (field: string) => any;
};

type Request = {
  header: any;
  headers: any;
  method: any;
  length?: number;
  url: any;
  originalUrl: any;
  origin: any;
  href: any;
  path: any;
  querystring: any;
  search: any;
  host: any;
  hostname: any;
  type: any;
  charset: any;
  query: any;
  fresh: any;
  stale: any;
  protocol: any;
  secure: any;
  ip: any;
  ips: any;
  subdomains: any;
  is: any;
  accepts: any;
  acceptsEncodings: any;
  acceptsCharsets: any;
  acceptsLanguages: any;
  idempotent: any;
  socket: any;
  get: any;
};

type G<T> = IterableIterator<T>;
type C = {
  req: any;
  res: any;
  request: Request;
  response: Response;
  state: any;
  app: any;
  cookies: any;
  throw: any;
  assert: any;
  respond: any;
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

  app.use(routes());

  app.listen(3000);
};

export { server };
