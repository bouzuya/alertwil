import { Twilio } from 'twilio';
import { process } from '../globals';
import { AlertId } from './alert-id';
import { AlertResult } from './alert-result';
import { Group } from './group';

interface Config {
  accountSid: string;
  authToken: string;
  callerNumber: string;
}

export class Alert {
  private _id: AlertId;
  private _group: Group;
  private _results: AlertResult[];
  private _targets: {
    number: string;
  }[];

  constructor({ id, group }: { id: AlertId; group: Group; }) {
    this._id = id;
    this._group = group;
    this._results = [];
    this._targets = group.users.slice();
    if (this._targets.length === 0) throw new Error();
  }

  get id(): AlertId {
    return this._id;
  }

  get result(): AlertResult {
    return this._results[this._results.length - 1];
  }

  add(result: AlertResult): void {
    this._results.push(result);
  }

  call(): void {
    // FIXME
    const target = this._targets[this._results.length % this._targets.length];
    const calleeNumber = target.number;
    const messageUrl = `${process.env.BASE_URL}/alerts/${this._id}`;
    const callbackUrl = `${process.env.BASE_URL}/alerts/${this._id}/results`;

    const accountSidOrUndefined = process.env.ACCOUNT_SID;
    if (typeof accountSidOrUndefined === 'undefined')
      throw new Error('ACCOUNT_SID');
    const authTokenOrUndefined = process.env.AUTH_TOKEN;
    if (typeof authTokenOrUndefined === 'undefined')
      throw new Error('AUTH_TOKEN');
    const callerNumberOrUndefined = process.env.CALLER_NUMBER;
    if (typeof callerNumberOrUndefined === 'undefined')
      throw new Error('CALLER_NUMBER');
    const config: Config = {
      accountSid: accountSidOrUndefined,
      authToken: authTokenOrUndefined,
      callerNumber: callerNumberOrUndefined
    };
    const accountSid = config.accountSid;
    const authToken = config.authToken;
    const client = new Twilio(accountSid, authToken);

    const from = config.callerNumber;
    const to = calleeNumber;
    const url = messageUrl;
    const statusCallback = callbackUrl;
    const params = { from, to, url, statusCallback };
    console.log(JSON.stringify(params));
    const promise = client.messages.create(params);
    return void promise.catch((error) => console.error(error));
  }
}
