import Tool, { ToolInfo } from '@/client/editor/types/Tool';
import ToolName from '@/client/editor/types/ToolName';
import EraseBlock from '../../use_cases/erase/EraseBlock';
import BlockStore from '../../stores/block/BlockStore';
import TransactionService from '../../services/update/TransactionService';

class EraseTool extends Tool {
  constructor(store: BlockStore, update: TransactionService) {
    super(store, update, ToolName.Erase);

    this.eraser = new EraseBlock(store, update);
  }

  onPointerDown({ eventObject }: ToolInfo) {
    this.eraser.erase([eventObject?.userData.modelId || '']);
  }

  private eraser: EraseBlock;
}

export default EraseTool;
