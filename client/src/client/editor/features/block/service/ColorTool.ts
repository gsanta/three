import Tool, { ToolInfo } from '@/client/editor/services/tool/service/Tool';
import ToolName from '@/client/editor/services/tool/state/ToolName';
import { colorToArray } from '@/client/editor/services/tool/colorUtils';
import UpdateService from './UpdateService';
import BlockStore from './BlockStore';

class ColorTool extends Tool {
  constructor(store: BlockStore, update: UpdateService) {
    super(store, ToolName.Color);

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

  private update: UpdateService;
}

export default ColorTool;
