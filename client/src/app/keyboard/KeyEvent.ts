import KeyCode from './KeyCode';

abstract class KeyEvent {
  readonly key: KeyCode;

  constructor(key: KeyCode) {
    this.key = key;
  }

  execute() {}
}

export default KeyEvent;
