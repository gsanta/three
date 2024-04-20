import { Store } from '@/common/utils/store';
import Tool, { ToolInfo } from '@/editor/services/tool/service/Tool';
import ToolName from '@/editor/services/tool/state/ToolName';
import { colorToArray } from '@/editor/services/tool/colorUtils';
import UpdateService from './UpdateService';

class ColorTool extends Tool {
  constructor(store: Store, update: UpdateService) {
    super(store, ToolName.Color);

    this.update = update;
  }

  onPointerDown({ eventObjectName }: ToolInfo) {
    const { blocks } = this.store.getState().blocks.present;
    const block = blocks[eventObjectName];

    if (!block) {
      return;
    }

    this.update
      .getUpdate()
      .updateBlock(eventObjectName, {
        color: colorToArray(this.store.getState().blockSettings.present.color),
      })
      .execute();
  }

  private update: UpdateService;
}

export default ColorTool;
