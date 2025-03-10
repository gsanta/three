import Edit from '@/client/editor/services/transaction/Edit';
import Block from '@/client/editor/types/Block';
import { BlockAddMethodName } from '@/common/model_types/BlockAddMethod';
import BlockType from '@/client/editor/types/BlockType';
import Num3 from '@/client/editor/types/Num3';
import AddContext from './AddContext';
import ExecuteAddParams from './ExecuteAddParams';

abstract class AddBlock {
  name: BlockAddMethodName;

  constructor(name: BlockAddMethodName) {
    this.name = name;
  }

  abstract perform({
    addContext,
    edit,
    targetBlock,
    targetPartIndex,
    newBlockType,
    clientX,
    clientY,
  }: {
    addContext: AddContext;
    edit: Edit;
  } & ExecuteAddParams): Edit;

  performAfterRender() {}
}

export default AddBlock;
