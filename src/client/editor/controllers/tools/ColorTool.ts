import Tool, { ToolInfo } from '@/client/editor/types/Tool';
import ToolName from '@/client/editor/types/ToolName';
import { colorToArray } from '@/client/editor/utils/colorUtils';
import TransactionService from '../../services/transaction/TransactionService';
import BlockStore from '../../stores/block/BlockStore';

class ColorTool extends Tool {
  constructor(store: BlockStore, update: TransactionService) {
    super(store, update, ToolName.Color);

    this.update = update;
  }

  onPointerDown({ eventObject }: ToolInfo) {
    const block = this.blockStore.getBlocks()[eventObject?.userData.modelId || ''];

    if (!block) {
      return;
    }

    this.update
      .createTransaction()
      .updateBlock(eventObject?.userData.modelId || '', {
        color: colorToArray(this.blockStore.getBlockSettings().color),
      })
      .commit();
  }
}

export default ColorTool;
