import * as assert from 'power-assert';
import { test } from 'beater';
import { Alert, Group, GroupId, User } from '../src/models';
import {
  AlertRepositoryImpl,
  GroupRepositoryImpl
} from '../src/repositories';

const tests = [
  test('repositories', () => {
    const groupId = new GroupId('456');
    const user = new User({ id: '123', number: '+810000000000' });
    const alertRepository = new AlertRepositoryImpl();
    const groupRepository = new GroupRepositoryImpl([
      new Group({ id: groupId, users: [user] })
    ]);
    const group = groupRepository.findBy({ groupId });
    const alertId = alertRepository.nextId();
    const alert = new Alert({ id: alertId, group })
    alertRepository.save(alert);
    const found = alertRepository.findBy({ alertId });
    assert.deepEqual(found, alert);
    const unsavedAlertId = alertRepository.nextId();
    const notFound = alertRepository.findBy({ alertId: unsavedAlertId });
    assert(typeof notFound === 'undefined');
  })
];

export { tests };
