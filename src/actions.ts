import { G, C } from './koa';
import {
  alert as renderAlert,
  alertResult as renderAlertResult
} from './views';
import {
  Alert,
  AlertId,
  AlertRepository,
  GroupId
} from './models';
import {
  AlertRepositoryImpl
} from './repositories';

function* createAlert<T>(next: G<T>): G<G<T>> {
  const context: C & { params: { id: string }; } = this;
  const groupId = new GroupId(context.params.id);
  const repository: AlertRepository = new AlertRepositoryImpl();
  const alertId = repository.nextId();
  const alert = new Alert({ id: alertId, groupId });
  alert.call();
  repository.save(alert);
  context.response.body = renderAlert(alert);
}

function* showAlert<T>(next: G<T>): G<G<T>> {
  const context: C & { params: { id: string }; } = this;
  const alertId = new AlertId(context.params.id);
  const repository: AlertRepository = new AlertRepositoryImpl();
  const alert = repository.findBy({ alertId });
  context.response.body = renderAlert(alert);
}

function* createAlertResult<T>(next: G<T>): G<G<T>> {
  const context: C & { params: { id: string }; } = this;
  const alertId = new AlertId(context.params.id);
  const repository: AlertRepository = new AlertRepositoryImpl();
  const alert = repository.findBy({ alertId });
  const result = alert.add('completed');
  repository.save(alert);
  context.response.body = renderAlertResult(result);
}

export { createAlert, showAlert, createAlertResult };
