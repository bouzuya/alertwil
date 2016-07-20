import { GroupId } from './group-id';
import { User } from './user';

export class Group {
  private _id: GroupId;
  private _users: User[];

  constructor({ id, users }: { id: GroupId; users: User[] }) {
    this._id = id;
    this._users = users;
  }

  get id(): GroupId {
    return this._id;
  }

  get users(): User[] {
    return this._users;
  }
}
