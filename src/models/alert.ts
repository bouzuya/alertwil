import { RestClient } from 'twilio';
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
    const messageUrl = `http://example.com/alerts/${this._id}`;
    const callbackUrl = `http://example.com/alerts/${this._id}/results`;

    const config: Config = {
      accountSid: process.env.ACCOUNT_SID,
      authToken: process.env.AUTH_TOKEN,
      callerNumber: process.env.CALLER_NUMBER
    };
    const accountSid = config.accountSid;
    const authToken = config.authToken;
    const client = new RestClient(accountSid, authToken);

    const from = config.callerNumber;
    const to = calleeNumber;
    const url = messageUrl;
    const statusCallback = callbackUrl;
    const promise = client.makeCall({ from, to, url, statusCallback });
    return void promise;
  }
}
