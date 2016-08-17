export class FakeSerialPort {

  static parsers = { readline(str) { } };

  private callbacks = [];

  private timeout;

  constructor(path, config) { }

  on(event, cb) {
    this.callbacks.push(cb);
  }

  off(event, cb) {
    this.callbacks = this.callbacks.filter(v => v !== cb);
  }

  write(data, onError) {
    clearTimeout(this.timeout);
    this.timeout = setTimeout(() => this.callbacks.map(cb => cb('p')), 500);

    setTimeout(() => onError(), 50);
  }
}
