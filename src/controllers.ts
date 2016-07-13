import { C } from './koa';

const createAlert = (groupId: string): void => {
  const context: C = this;
  context.response.body = 'POST /groups/:id/alerts groupId=' + groupId;
};

const showAlert = (alertId: string): void => {
  const context: C = this;
  context.response.body = 'GET /alerts/:id alertId=' + alertId;
};

const createAlertResult = (alertId: string): void => {
  const context: C = this;
  context.response.body = 'POST /alerts/:id/results alertId=' + alertId;
};

export { createAlert, showAlert, createAlertResult };
