export class Alert {
  private _id: AlertId;
  private _groupId: GroupId;

  constructor({ id, groupId }: { id: AlertId; groupId: GroupId; }) {
    this._id = id;
    this._groupId = groupId;
  }

  get id(): AlertId {
    return this._id;
  }

  get groupId(): GroupId {
    return this._groupId;
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
