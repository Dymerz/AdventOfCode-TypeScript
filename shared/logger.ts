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

  private writeLine(symbol: string, ...text: Printable[]): void {
    if (!this.config.enabled)
      return;

    if(typeof text === 'object') {
      console.log(`${symbol}`)
      console.log(text)
    }
    else
      console.log(`${symbol} ${text}`)
  }

  public error (...text: Printable[]): void {
    this.writeLine('[❌]', ...text)
  }

  public success (...text: Printable[]): void {
    this.writeLine('[✅]', ...text)
  }

  public plus (...text: Printable[]): void {
    this.writeLine('[➕]', ...text)
  }

  public less (...text: Printable[]): void {
    this.writeLine('[➖]', ...text)
  }

  public equal (...text: Printable[]): void {
    this.writeLine('[==]', ...text)
  }

  public ok (...text: Printable[]): void {
    this.writeLine('[🆗]', ...text)
  }

  public circle (...text: Printable[]): void {
    this.writeLine('[⚪]', ...text)
  }

  public info (...text: Printable[]): void {
    this.writeLine('[ℹ️ ]', ...text) // the space is not a mistake!
  }

  public debug (...text: Printable[]): void {
    this.writeLine('[🚧]', ...text) // the space is not a mistake!
  }
}