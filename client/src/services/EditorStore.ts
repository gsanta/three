import { makeObservable, observable } from 'mobx';

class EditorStore {
  color = '#000000';

  constructor() {
    makeObservable(this, {
      color: observable,
      setColor: observable,
    });
  }

  setColor(color: string) {
    this.color = color;

    const r = this.color.substring(1, 3);
    const g = this.color.substring(3, 5);
    const b = this.color.substring(5, 7);
    const hexColor = Number('0xff' + b + g + r);
    window.Module.setColor(hexColor);
  }
}

export default EditorStore;
