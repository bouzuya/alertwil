import { fs, s3 } from './loaders';
import { Promise } from './globals';
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

const load = (
  options: {
    loader: string;
    loaderOptions: any;
  }
): Promise<Group[]> => {
  const { loader: loaderType, loaderOptions } = options || {
    loader: 'fs',
    loaderOptions: { file: 'config.json' }
  };
  const loader = loaderType === 'fs' ? fs : s3;
  const promise: Promise<Config> = loader.call(this, loaderOptions);
  return promise.then((config) => loadGroups(config));
};

export { load };
