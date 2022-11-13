import KeyEvent from './KeyEvent';

class KeyboardHandler {
  private events: Set<KeyEvent> = new Set();

  addKeyEvent(keyEvent: KeyEvent) {
    this.events.add(keyEvent);
  }

  removeKeyEvent(keyEvent: KeyEvent) {
    this.events.delete(keyEvent);
  }

  emitKeyDown(event: KeyboardEvent) {
    for (const keyEvent of this.events) {
      if (keyEvent.key === event.code) {
        keyEvent.execute();
      }
    }
  }
}

export default KeyboardHandler;
