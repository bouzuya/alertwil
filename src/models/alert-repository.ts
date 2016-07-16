import { Alert } from './alert';
import { AlertId } from './alert-id';

export interface AlertRepository {
  findBy(query: { alertId?: AlertId; }): Alert;
  nextId(): AlertId;
  save(alert: Alert): void;
}
