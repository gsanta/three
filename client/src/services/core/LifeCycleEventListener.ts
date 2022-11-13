import { AppContextType } from '@/core/AppContext';

interface LifeCycleEventListener {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  onCanvasInitialized(_context: AppContextType): void;
}

export default LifeCycleEventListener;
