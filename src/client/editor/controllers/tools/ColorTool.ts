import Tool, { ToolInfo } from '@/client/editor/types/Tool';
import ToolName from '@/client/editor/types/ToolName';
import { colorToArray } from '@/client/editor/utils/colorUtils';
import UpdateService from '../../services/update/UpdateService';
import BlockStore from '../../stores/block/BlockStore';

class ColorTool extends Tool {
  constructor(store: BlockStore, update: UpdateService) {
    super(store, update, ToolName.Color);

    this.update = update;
  }

  onPointerDown({ eventObjectName }: ToolInfo) {
    const block = this.store.getBlocks()[eventObjectName];

    if (!block) {
      return;
    }

    this.update
      .getUpdate()
      .updateBlock(eventObjectName, {
        color: colorToArray(this.store.getBlockSettings().color),
      })
      .commit();
  }
}

export default ColorTool;
