import * as assert from 'power-assert';
import beater from 'beater';
import * as proxyquire from 'proxyquire';
import * as sinon from 'sinon';
import { Alert, GroupId } from '../src/models';
import { AlertRepositoryImpl } from '../src/repositories';

const { test } = beater();

test('repositories', () => {
  const repository = new AlertRepositoryImpl();
  const groupId = new GroupId('456');
  const alertId = repository.nextId();
  const alert = new Alert({ id: alertId, groupId })
  repository.save(alert);
  const found = repository.findBy({ alertId: alertId });
  assert.deepEqual(found, alert);
  const otherAlertId = repository.nextId();
  const notFound = repository.findBy({ alertId: otherAlertId });
  assert(typeof notFound === 'undefined');
});
