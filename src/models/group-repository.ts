import { Group } from './group';
import { GroupId } from './group-id';

export interface GroupRepository {
  findBy(query: { groupId?: GroupId; }): Group;
}
