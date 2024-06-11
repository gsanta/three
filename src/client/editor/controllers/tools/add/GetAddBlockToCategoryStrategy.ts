import Block from '@/client/editor/types/Block';
import BlockType from '@/client/editor/types/BlockType';

export type GetStrategyParams = {
  targetBlock: Block;
  targetPartIndex: string;
  newBlockType: BlockType;
};

export type AddStrategyType =
  | 'source-origin-target-slot'
  | 'source-origin-target-pointer-pos'
  | 'source-slot-target-slot'
  | 'source-origin-target-plane';

abstract class GetAddBlockToCategoryStrategy {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  getStrategy(_params: GetStrategyParams): AddStrategyType | undefined {
    return undefined;
  }
}

export default GetAddBlockToCategoryStrategy;
