import express from 'express';
import {
  alert as renderAlert,
  alertResult as renderAlertResult
} from './views';
import {
  Alert,
  AlertId,
  AlertRepository,
  AlertResult,
  Group,
  GroupId,
  GroupRepository
} from './models';
import {
  AlertRepositoryImpl,
  GroupRepositoryImpl
} from './repositories';
import { RoutedRequest } from './routes';

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
    // TODO
    if (group === null) throw new Error('group not found');
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
    // TODO
    if (alert === null) throw new Error('alert not found');
    const result = new AlertResult(status);
    alert.add(result);
    if (!alert.result.completed) alert.call();
    this._alertRepository.save(alert);
    return renderAlertResult(alert.result);
  }
}

const createAlert = (
  service: AlertApplicationService,
  request: RoutedRequest,
  response: express.Response
): void => {
  const id = request.params.id;
  response.send(service.createAlert(id));
};

const showAlert = (
  service: AlertApplicationService,
  request: RoutedRequest,
  response: express.Response
): void => {
  const id = request.params.id;
  response.send(service.showAlert(id));
};

const createAlertResult = (
  service: AlertApplicationService,
  request: RoutedRequest,
  response: express.Response
): void => {
  const status = request.body['CallStatus'];
  const id = request.params.id
  response.send(service.createAlertResult(id, status));
};

const actions = (groups: Group[]) => {
  const service = new AlertApplicationService(
    new AlertRepositoryImpl(), new GroupRepositoryImpl(groups));
  return (request: RoutedRequest, response: express.Response): void => {
    switch (request.actionName) {
      case 'alerts#create':
        return createAlert(service, request, response);
      case 'alerts#show':
        return showAlert(service, request, response);
      case 'alert/results#create':
        return createAlertResult(service, request, response);
      default:
        throw new Error();
    }
  };
};

export { actions };
