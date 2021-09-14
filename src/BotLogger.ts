export interface ILogger {
  LogInfo(msg: any): void;

  LogDebug(msg: any): void;

  LogError(msg: any): void;
}

export class ConsoleLogger implements ILogger {
  public logInfo: boolean = false;
  public logDebug: boolean = true;
  public error: boolean = true;

  public async LogInfo(msg: any) {
    if (this.logInfo) {
      console.log(this.ParseData(new Date()) + ' INFO:' + msg);
    }
  }
  public async LogDebug(msg: any) {
    if (this.logDebug) {
      console.log(this.ParseData(new Date()) + ' DEBUG:' + msg);
    }
  }
  public async LogError(msg: any) {
    if (this.logDebug) {
      console.log(this.ParseData(new Date()) + ' ERROR:' + msg);
    }
  }
  private ParseData(dateTime: Date): string {
    return (
      dateTime.getUTCFullYear() +
      '/' +
      ('0' + (dateTime.getUTCMonth() + 1)).slice(-2) +
      '/' +
      ('0' + dateTime.getUTCDate()).slice(-2) +
      ' ' +
      ('0' + dateTime.getUTCHours()).slice(-2) +
      ':' +
      ('0' + dateTime.getUTCMinutes()).slice(-2) +
      ':' +
      ('0' + dateTime.getUTCSeconds()).slice(-2)
    );
  }
}
