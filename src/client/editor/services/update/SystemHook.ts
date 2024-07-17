import { UpdateBlocks } from '../../stores/block/blockSlice';

abstract class SystemHook {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  onCommit(_updates: UpdateBlocks['blockUpdates']) {
    throw new Error('Unimplemented method');
  }
}

export default SystemHook;
