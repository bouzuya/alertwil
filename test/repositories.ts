import * as assert from 'power-assert';
import beater from 'beater';
import * as proxyquire from 'proxyquire';
import * as sinon from 'sinon';
import { Alert, Group, GroupId } from '../src/models';
import {
  AlertRepositoryImpl,
  GroupRepositoryImpl,
  _storage
} from '../src/repositories';

const { test } = beater();

test('repositories', () => {
  const groupId = new GroupId('456');
  _storage.groups.push(
    new Group({ id: groupId, users: [{ number: '+810000000000' }] }));

  const alertRepository = new AlertRepositoryImpl();
  const groupRepository = new GroupRepositoryImpl();
  const group = groupRepository.findBy({ groupId });
  const alertId = alertRepository.nextId();
  const alert = new Alert({ id: alertId, group })
  alertRepository.save(alert);
  const found = alertRepository.findBy({ alertId });
  assert.deepEqual(found, alert);
  const unsavedAlertId = alertRepository.nextId();
  const notFound = alertRepository.findBy({ alertId: unsavedAlertId });
  assert(typeof notFound === 'undefined');
});
