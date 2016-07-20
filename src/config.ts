import { fs } from './loaders';
import { Group, GroupId, User, Config } from './models';

const loadGroups = (config: Config): Group[] => {
  return config.groups.map((group) => {
    return new Group({
      id: new GroupId(group.id),
      users: group.users.map((userId) => {
        const user = config.users.find((user) => user.id === userId);
        if (typeof user === 'undefined') throw new Error();
        return new User({
          id: user.id,
          number: user.number
        });
      })
    });
  });
};

const load = (options: { loader: string; loaderOptions: any; }): any => {
  // TODO:
  const loadConfig = fs;
  const loadConfigOptions = { file: options.loaderOptions.file };
  return loadGroups(loadConfig(loadConfigOptions));
};

export { load };
