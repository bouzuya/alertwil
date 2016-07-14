import { Alert, AlertId, AlertRepository } from './models';

const alerts: Alert[] = []; // FIXME

export class AlertRepositoryImpl implements AlertRepository {
  findBy(query: { alertId?: AlertId; }): Alert {
    const { alertId } = query;
    return alerts.find((alert) => alert.id.equals(alertId));
  }

  nextId(): AlertId {
    return new AlertId(String(alerts.length));
  }

  save(alert: Alert): void {
    alerts.push(alert);
  }
}
