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

export class AlertId {
  private _id: string;

  constructor(id: string) {
    this._id = id;
  }

  equals(id: AlertId): boolean {
    return this._id === id._id;
  }
}

export class AlertResult {
  private _status: string;

  constructor(status: string) {
    this._status = status;
  }

  get completed(): boolean {
    return this._status === 'Completed';
  }
}

export class GroupId {
  private _id: string;

  constructor(id: string) {
    this._id = id;
  }

  equals(id: GroupId): boolean {
    return this._id === id._id;
  }
}

export interface AlertRepository {
  findBy(query: { alertId?: AlertId; }): Alert;
  nextId(): AlertId;
  save(alert: Alert): void;
}
