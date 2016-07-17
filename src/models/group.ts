import { GroupId } from './group-id';

export class Group {
  private _id: GroupId;
  private _users: {
    number: string;
  }[];

  constructor({ id, users }: { id: GroupId; users: { number: string; }[] }) {
    this._id = id;
    this._users = users;
  }

  get id(): GroupId {
    return this._id;
  }

  get users(): { number: string; }[] {
    return this._users;
  }
}
