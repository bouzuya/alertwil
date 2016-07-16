export class AlertResult {
  private _status: string;

  constructor(status: string) {
    this._status = status;
  }

  get completed(): boolean {
    return this._status === 'Completed';
  }
}
