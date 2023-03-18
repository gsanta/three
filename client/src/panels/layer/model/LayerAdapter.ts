import Editor from '@/services/editor/Editor';
import { action, makeObservable, observable } from 'mobx';

class LayerAdapter {
  private name: string;

  private index: number;

  private visible = true;

  private editorApi: Editor;

  constructor(name: string, index: number, editorApi: Editor) {
    this.name = name;
    this.index = index;
    this.editorApi = editorApi;

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

  getIndex() {
    return this.index;
  }

  setIndex(index: number): void {
    this.index = index;
  }

  getName(): string {
    return this.name;
  }

  setVisible(isVisible: boolean) {
    if (isVisible) {
      this.editorApi.enableLayer(this.index);
    } else {
      this.editorApi.disableLayer(this.index);
    }

    this.visible = isVisible;
  }

  isVisible() {
    return this.visible;
  }
}

export default LayerAdapter;
