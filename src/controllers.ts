import { G, C } from './koa';

function* createAlert<T>(next: G<T>): G<G<T>> {
  const groupId: string = this.params.id;
  const context: C = this;
  context.response.body = 'POST /groups/:id/alerts groupId=' + groupId;
}

function* showAlert<T>(next: G<T>): G<G<T>> {
  const alertId: string = this.params.id;
  const context: C = this;
  context.response.body = 'GET /alerts/:id alertId=' + alertId;
}

function* createAlertResult<T>(next: G<T>): G<G<T>> {
  const alertId: string = this.params.id;
  const context: C = this;
  context.response.body = 'POST /alerts/:id/results alertId=' + alertId;
}

export { createAlert, showAlert, createAlertResult };
