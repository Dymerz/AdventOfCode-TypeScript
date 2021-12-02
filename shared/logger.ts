type Config = {
  enabled: boolean
}

type Printable = string|number|Object

export default class Logger {

  private config: Config = {
    enabled: true
  }

  constructor(config?: Config) {
    if (config) this.config = config
  }

  private writeLine(symbol: string, ...texts: Printable[]): void {
    if (!this.config.enabled)
      return;

    if(!Array.isArray(texts) && typeof texts === 'object') {
      console.log(`${symbol}`)
      console.log(texts)
    }
    else
      console.log(`${symbol} ${texts}`)
  }

  public error (...texts: Printable[]): void {
    this.writeLine('❌', ...texts)
  }

  public success (...texts: Printable[]): void {
    this.writeLine('✅', ...texts)
  }

  public plus (...texts: Printable[]): void {
    this.writeLine('➕', ...texts)
  }

  public less (...texts: Printable[]): void {
    this.writeLine('➖', ...texts)
  }

  public equal (...texts: Printable[]): void {
    this.writeLine('==', ...texts)
  }

  public ok (...texts: Printable[]): void {
    this.writeLine('🆗', ...texts)
  }

  public circle (...texts: Printable[]): void {
    this.writeLine('⚪', ...texts)
  }

  public info (...texts: Printable[]): void {
    this.writeLine('ℹ️ ', ...texts) // the space is not a mistake!
  }

  public debug (...texts: Printable[]): void {
    this.writeLine('🚧', ...texts) // the space is not a mistake!
  }
}