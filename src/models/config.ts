export type UserIdString = string;
export type GroupIdString = string;

export interface UserConfig {
  id: UserIdString;
  number: string;
}

export interface GroupConfig {
  id: GroupIdString;
  users: UserIdString[];
}

export interface Config {
  users: UserConfig[];
  groups: GroupConfig[];
}
