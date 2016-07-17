import {
  Alert, AlertId, AlertRepository,
  Group, GroupId, GroupRepository
} from './models';

const alerts: Alert[] = []; // FIXME
const groups: Group[] = []; // FIXME

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

export class GroupRepositoryImpl implements GroupRepository {
  findBy(query: { groupId?: GroupId; }): Group {
    const { groupId } = query;
    return groups.find((group) => group.id.equals(groupId));
  }
}
