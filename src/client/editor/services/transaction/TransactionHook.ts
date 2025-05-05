import { UpdateBlocks } from '../../stores/block/blockSlice.types';

interface TransactionHook {
  onCommit(_updates: UpdateBlocks['blockUpdates']): void;
}

export default TransactionHook;
