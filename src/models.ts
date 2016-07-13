export interface Alert {
  id: string;
}

export interface AlertRepository {
  findBy(query: { alertId?: string; }): Alert;
}
