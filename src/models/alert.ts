import { AlertId } from './alert-id';
import { AlertResult } from './alert-result';
import { GroupId } from './group-id';

export class Alert {
  private _id: AlertId;
  private _groupId: GroupId;
  private _results: AlertResult[];

  constructor({ id, groupId }: { id: AlertId; groupId: GroupId; }) {
    this._id = id;
    this._groupId = groupId;
    this._results = [];
  }

  get id(): AlertId {
    return this._id;
  }

  get groupId(): GroupId {
    return this._groupId;
  }

  get result(): AlertResult {
    return this._results[this._results.length - 1];
  }

  add(result: AlertResult): void {
    this._results.push(result);
  }

  call(): void {
    // TODO: call twilio
  }
}
