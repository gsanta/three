import Edit from '@/client/editor/services/transaction/Edit';
import Block from '@/client/editor/types/Block';
import BlockAddMethodName from '@/common/model_types/BlockAddMethod';
import BlockType from '@/client/editor/types/BlockType';
import Num3 from '@/client/editor/types/Num3';

abstract class AddBlock {
  name: BlockAddMethodName;

  constructor(name: BlockAddMethodName) {
    this.name = name;
  }

  abstract perform({
    edit,
    targetBlock,
    targetPartIndex,
    newBlockType,
    clientX,
    clientY,
  }: {
    edit: Edit;
    targetBlock: Block | undefined;
    targetPartIndex: string | undefined;
    newBlockType: BlockType;
    clientX: number;
    clientY: number;
    position: Num3;
  }): Edit;

  performAfterRender() {}
}

export default AddBlock;
