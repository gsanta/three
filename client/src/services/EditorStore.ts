import { makeObservable, observable } from 'mobx';
import EditorApi from './api/EditorApi';

class EditorStore {
  color = '#000000';

  private editorApi: EditorApi;

  constructor(editorApi: EditorApi) {
    this.editorApi = editorApi;
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
    this.editorApi.setColor(hexColor);
  }
}

export default EditorStore;
