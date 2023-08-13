import { store } from '@/utils/store';
import { setActiveFrame } from '../frame/state/frameSlice';

export class EditorCallbacks {
  onActiveFrameChanged(index: number): void {
    store.dispatch(setActiveFrame(index));
  }
}

window.editorCallbacks = {
  onActiveFrameChanged() {},
};
