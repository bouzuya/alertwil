import { Alert, AlertRepository } from './models';

const alerts: Alert[] = []; // FIXME

export class AlertRepositoryImpl implements AlertRepository {
  findBy(query: { alertId?: string; }): Alert {
    const { alertId } = query;
    return alerts.find((alert) => alert.id === alertId);
  }

  nextId(): string {
    return String(alerts.length);
  }

  save(alert: Alert): void {
    alerts.push(alert);
  }
}
