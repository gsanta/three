import Block from '@/client/editor/types/Block';
import BlockType from '@/client/editor/types/BlockType';
import Num3 from '@/client/editor/types/Num3';

abstract class AddBlock {
  sourceCategories: (string | undefined)[] = [];

  targetCategories: (string | undefined)[] = [];

  abstract perform({
    targetBlock,
    targetPartIndex,
    newBlockType,
    clientX,
    clientY,
  }: {
    targetBlock: Block | undefined;
    targetPartIndex: string | undefined;
    newBlockType: BlockType;
    clientX: number;
    clientY: number;
    position: Num3;
  }): void;

  performAfterRender() {}
}

export default AddBlock;
