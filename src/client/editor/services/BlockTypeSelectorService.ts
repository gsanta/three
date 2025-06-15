import { store } from '@/client/common/utils/store';
import BlockConstantData from '../models/block/BlockConstantData';
import { setActiveBlockType } from '../stores/blockType/blockTypeSlice';
import BlockTypeStore from '../stores/blockType/BlockTypeStore';
import { setSelectedTool } from '../stores/tool/toolSlice';
import ToolName from '../models/tool/ToolName';

class BlockTypeSelectorService {
  constructor(blockTypeStore: BlockTypeStore) {
    this.blockTypeStore = blockTypeStore;
  }

  setSelectedBlockType(blockType: BlockConstantData): void {
    store.dispatch(setActiveBlockType(blockType.type));

    if (blockType.decorations.includes('cables')) {
      store.dispatch(setSelectedTool(ToolName.Cable));
    } else {
      store.dispatch(setSelectedTool(ToolName.Add));
    }
  }

  private blockTypeStore: BlockTypeStore;
}

export default BlockTypeSelectorService;
