import { action, makeObservable, observable } from 'mobx';

class LayerAdapter {
  private name: string;

  private id: string;

  private visible = true;

  constructor(name: string, id: string) {
    this.name = name;
    this.id = id;

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

  getId() {
    return this.id;
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
