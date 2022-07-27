export class Logger {
  private static logLevelOption: Record<string, boolean>;
  // Singleton
  private static instance: Logger;
  private constructor() {
    Logger.logLevelOption['Info'] = true;
    Logger.logLevelOption['Warn'] = true;
    Logger.logLevelOption['Error'] = true;
    Logger.logLevelOption['']
  }
  static getInstance() {
    if(!this.instance) {
      this.instance = new Logger();
    }
    return this.instance;
  }
}