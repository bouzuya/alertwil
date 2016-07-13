import * as koa from 'koa';

export type Response = {
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

export type Request = {
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

export type G<T> = IterableIterator<T>;
export type C = {
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

export { koa };
