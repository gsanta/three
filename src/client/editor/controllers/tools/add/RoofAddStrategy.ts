import BlockType from '@/client/editor/types/BlockType';
import AddStrategy, { AddStrategyType } from './AddStrategy';
import Block from '@/client/editor/types/Block';

class RoofAddStrategy extends AddStrategy {
  getStrategy(target: Block, targetPartIndex: string, addingBlockType: BlockType): AddStrategyType | undefined {
    if (addingBlockType.category === 'weather-heads') {
      return 'source-origin-target-pointer-pos';
    }

    return undefined;
  }
}

export default RoofAddStrategy;
