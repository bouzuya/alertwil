import { G, C } from './koa';
import {
  alert as renderAlert,
  alertResult as renderAlertResult
} from './views';
import {
  Alert,
  AlertId,
  AlertRepository,
  AlertResult,
  GroupId
} from './models';
import {
  AlertRepositoryImpl
} from './repositories';

class AlertApplicationService {
  private repository: AlertRepository;

  constructor(repository: AlertRepository) {
    this.repository = repository;
  }

  createAlert(groupIdString: string): string {
    const groupId = new GroupId(groupIdString);
    const alertId = this.repository.nextId();
    const alert = new Alert({ id: alertId, groupId });
    alert.call();
    this.repository.save(alert);
    return renderAlert(alert);
  }

  showAlert(alertIdString: string): string {
    const alertId = new AlertId(alertIdString);
    const alert = this.repository.findBy({ alertId });
    return renderAlert(alert);
  }

  createAlertResult(alertIdString: string, status: string): string {
    const alertId = new AlertId(alertIdString);
    const alert = this.repository.findBy({ alertId });
    const result = new AlertResult(status);
    alert.add(result);
    if (!alert.result.completed) alert.call();
    this.repository.save(alert);
    return renderAlertResult(alert.result);
  }
}

function* createAlert<T>(next: G<T>): G<G<T>> {
  const context: C & { params: { id: string; }; } = this;
  const service = new AlertApplicationService(new AlertRepositoryImpl());
  context.response.body = service.createAlert(context.params.id);
}

function* showAlert<T>(next: G<T>): G<G<T>> {
  const context: C & { params: { id: string; }; } = this;
  const service = new AlertApplicationService(new AlertRepositoryImpl());
  context.response.body = service.showAlert(context.params.id);
}

function* createAlertResult<T>(next: G<T>): G<G<T>> {
  const context: C & { params: { id: string; }; } & {
    request: { body: { [key: string]: string; } };
  } = this;
  const service = new AlertApplicationService(new AlertRepositoryImpl());
  const status = context.request.body['Status'];
  context.response.body = service.createAlertResult(context.params.id, status);
}

export { createAlert, showAlert, createAlertResult };
