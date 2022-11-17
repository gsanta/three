import { action, makeObservable, observable } from 'mobx';

class LayerAdapter {
  private name: string;

  private visible = true;

  constructor(name: string) {
    this.name = name;

    makeObservable<LayerAdapter, 'name' | 'visible'>(this, {
      name: observable,
      setName: action,
      setVisible: action,
      visible: observable,
    });
  }

  setName(name: string) {
    this.name = name;
  }

  getName(): string {
    return this.name;
  }

  setVisible(isVisible: boolean) {
    this.visible = isVisible;
  }

  isVisible() {
    return this.visible;
  }
}

export default LayerAdapter;
