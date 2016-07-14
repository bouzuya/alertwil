import { Alert, AlertRepository } from './models';

export class AlertRepositoryImpl implements AlertRepository {
  findBy(query: { alertId?: string; }): Alert {
    const { alertId } = query;
    return { id: alertId };
  }
}
