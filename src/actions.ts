import { G, C } from './koa';
import {
  alert as renderAlert,
  alertResult as renderAlertResult
} from './views';
import {
  AlertRepository
} from './models';
import {
  AlertRepositoryImpl
} from './repositories';

function* createAlert<T>(next: G<T>): G<G<T>> {
  const context: C & { params: { id: string }; } = this;
  const groupId = context.params.id;
  const alert = { groupId };
  context.response.body = renderAlert(alert);
}

function* showAlert<T>(next: G<T>): G<G<T>> {
  const context: C & { params: { id: string }; } = this;
  const alertId = context.params.id;
  const repository: AlertRepository = new AlertRepositoryImpl();
  const alert = repository.findBy({ alertId });
  context.response.body = renderAlert(alert);
}

function* createAlertResult<T>(next: G<T>): G<G<T>> {
  const context: C & { params: { id: string }; } = this;
  const alertId = context.params.id;
  const result = { alertId };
  context.response.body = renderAlertResult(result);
}

export { createAlert, showAlert, createAlertResult };