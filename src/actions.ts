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
  GroupId,
  GroupRepository
} from './models';
import {
  AlertRepositoryImpl,
  GroupRepositoryImpl
} from './repositories';

class AlertApplicationService {
  private _alertRepository: AlertRepository;
  private _groupRepository: GroupRepository;

  constructor(repository: AlertRepository, groupRepository: GroupRepository) {
    this._alertRepository = repository;
    this._groupRepository = groupRepository;
  }

  createAlert(groupIdString: string): string {
    const groupId = new GroupId(groupIdString);
    const group = this._groupRepository.findBy({ groupId });
    const alertId = this._alertRepository.nextId();
    const alert = new Alert({ id: alertId, group });
    alert.call();
    this._alertRepository.save(alert);
    return renderAlert(alert);
  }

  showAlert(alertIdString: string): string {
    const alertId = new AlertId(alertIdString);
    const alert = this._alertRepository.findBy({ alertId });
    return renderAlert(alert);
  }

  createAlertResult(alertIdString: string, status: string): string {
    const alertId = new AlertId(alertIdString);
    const alert = this._alertRepository.findBy({ alertId });
    const result = new AlertResult(status);
    alert.add(result);
    if (!alert.result.completed) alert.call();
    this._alertRepository.save(alert);
    return renderAlertResult(alert.result);
  }
}

function* createAlert<T>(next: G<T>): G<G<T>> {
  const context: C & { params: { id: string; }; } = this;
  const service = new AlertApplicationService(
    new AlertRepositoryImpl(), new GroupRepositoryImpl());
  context.response.body = service.createAlert(context.params.id);
}

function* showAlert<T>(next: G<T>): G<G<T>> {
  const context: C & { params: { id: string; }; } = this;
  const service = new AlertApplicationService(
    new AlertRepositoryImpl(), new GroupRepositoryImpl());
  context.response.body = service.showAlert(context.params.id);
}

function* createAlertResult<T>(next: G<T>): G<G<T>> {
  const context: C & { params: { id: string; }; } & {
    request: { body: { [key: string]: string; } };
  } = this;
  const service = new AlertApplicationService(
    new AlertRepositoryImpl(), new GroupRepositoryImpl());
  const status = context.request.body['Status'];
  context.response.body = service.createAlertResult(context.params.id, status);
}

const actions = (): <T>(next: G<T>) => G<G<T>> => {
  return function* <T>(next: G<T>): G<G<T>> {
    switch (this.request.params.name) {
      case 'alerts#create':
        return createAlert(next);
      case 'alerts#show':
        return showAlert(next);
      case 'alert/results#create':
        return createAlertResult(next);
      default:
        throw new Error();
    }
  };
};

export { actions };
