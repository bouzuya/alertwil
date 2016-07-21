export class GroupId {
  private _id: string;

  constructor(id: string) {
    this._id = id;
  }

  equals(id: GroupId): boolean {
    return this._id === id._id;
  }

  toString(): string {
    return this._id;
  }
}
