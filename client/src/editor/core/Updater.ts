class Updater {
  private forceUpdate: () => void;

  constructor(forceUpdate: () => void) {
    this.forceUpdate = forceUpdate;
  }

  update() {
    this.forceUpdate();
  }
}

export default Updater;
