export class User {
  private _id: string;
  private _number: string;

  constructor({ id, number }: { id: string; number: string; }) {
    this._id = id;
    this._number = number;
  }

  get id(): string {
    return this._id;
  }

  get number(): string {
    return this._number;
  }
}
