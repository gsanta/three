import Block from '@/client/editor/types/Block';
import BlockType from '@/client/editor/types/BlockType';

export type AddStrategyType =
  | 'source-origin-target-slot'
  | 'source-origin-target-pointer-pos'
  | 'source-slot-target-slot'
  | 'source-origin-target-plane';

abstract class AddStrategy {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  getStrategy(_target: Block, _targetPartIndex: string, _addingBlockType: BlockType): AddStrategyType | undefined {
    return undefined;
  }
}

export default AddStrategy;
