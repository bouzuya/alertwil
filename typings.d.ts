declare module 'koa' {
  var koa: any;
  export = koa;
}

declare module 'koa-bodyparser' {
  var bodyParser: any;
  export = bodyParser;
}

declare module 'koa-router' {
  var router: any;
  export = router;
}

declare module 'twilio' {
  export class RestClient {
    constructor(accountSid: string, authToken: string);
    makeCall(params: {
      from: string;
      to: string;
      url: string;
      statusCallback: string;
    }): Promise<void>;
  }

  export class TwimlResponse {
    say: Function;
  }
}
