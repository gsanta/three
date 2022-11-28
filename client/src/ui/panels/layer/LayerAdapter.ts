import EditorApi from '@/services/api/EditorApi';
import { action, makeObservable, observable } from 'mobx';

class LayerAdapter {
  private name: string;

  private id: string;

  private visible = true;

  private editorApi: EditorApi;

  constructor(name: string, id: string, editorApi: EditorApi) {
    this.name = name;
    this.id = id;
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

  getId() {
    return this.id;
  }

  getName(): string {
    return this.name;
  }

  setVisible(isVisible: boolean) {
    if (isVisible) {
      this.editorApi.enableLayer(this.id);
    } else {
      this.editorApi.disableLayer(this.id);
    }

    this.visible = isVisible;
  }

  isVisible() {
    return this.visible;
  }
}

export default LayerAdapter;
