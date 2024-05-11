import Tool, { ToolInfo } from '@/client/editor/types/Tool';
import ToolName from '@/client/editor/types/ToolName';
import EraseBlock from '../../use_cases/erase/EraseBlock';
import BlockStore from '../../stores/block/BlockStore';
import UpdateService from '../../services/update/UpdateService';

class EraseTool extends Tool {
  constructor(store: BlockStore, update: UpdateService) {
    super(store, update, ToolName.Erase);

    this.eraser = new EraseBlock(store, update);
  }

  onPointerDown({ eventObjectName }: ToolInfo) {
    this.eraser.erase([eventObjectName]);
  }

  private eraser: EraseBlock;
}

export default EraseTool;
