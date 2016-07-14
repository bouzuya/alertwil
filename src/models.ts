export class Alert {
  private _id: string;
  private _groupId: string;

  constructor({ id, groupId }: { id: string; groupId: string; }) {
    this._id = id;
    this._groupId = groupId;
  }

  get id(): string {
    return this._id;
  }

  get groupId(): string {
    return this._groupId;
  }
}

export interface AlertRepository {
  findBy(query: { alertId?: string; }): Alert;
  nextId(): string;
  save(alert: Alert): void;
}
