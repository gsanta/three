import Edit from '@/client/editor/services/transaction/Edit';
import { BlockAddMethodName } from '@/common/model_types/BlockAddMethod';
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
