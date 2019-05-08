import { Alert } from './alert';
import { AlertId } from './alert-id';

export interface AlertRepository {
  findBy(query: { alertId?: AlertId; }): Alert | null;
  nextId(): AlertId;
  save(alert: Alert): void;
}
