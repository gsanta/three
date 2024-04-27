import Tool, { ToolInfo } from '@/client/editor/features/tool/service/Tool';
import ToolName from '@/client/editor/features/tool/state/ToolName';
import { colorToArray } from '@/client/editor/features/tool/colorUtils';
import UpdateService from '../../services/update/UpdateService';
import BlockStore from '../../BlockStore';

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
