import { App } from '@/core/App';

interface LifeCycleEventListener {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  onCanvasInitialized(_context: App): void;
}

export default LifeCycleEventListener;
