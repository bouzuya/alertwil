import {
  Alert, AlertId, AlertRepository,
  Group, GroupId, GroupRepository
} from './models';

const alerts: Alert[] = [];

export class AlertRepositoryImpl implements AlertRepository {
  findBy(query: { alertId?: AlertId; }): Alert {
    const { alertId } = query;
    return alerts.find((alert) => alert.id.equals(alertId));
  }

  nextId(): AlertId {
    return new AlertId(String(alerts.length));
  }

  save(alert: Alert): void {
    const index = alerts.findIndex((i) => i.id.equals(alert.id));
    if (index < 0) {
      alerts.push(alert);
    } else {
      alerts.splice(index, 1, alert);
    }
  }
}

export class GroupRepositoryImpl implements GroupRepository {
  private _groups: Group[];

  constructor(groups: Group[]) {
    this._groups = groups;
  }

  findBy(query: { groupId?: GroupId; }): Group {
    const { groupId } = query;
    return this._groups.find((group) => group.id.equals(groupId));
  }
}
