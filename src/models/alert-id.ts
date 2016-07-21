export class AlertId {
  private _id: string;

  constructor(id: string) {
    this._id = id;
  }

  equals(id: AlertId): boolean {
    return this._id === id._id;
  }

  toString(): string {
    return this._id;
  }
}
