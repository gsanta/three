import Tool, { ToolInfo } from '@/editor/services/tool/service/Tool';
import ToolName from '@/editor/services/tool/state/ToolName';
import Eraser from './Eraser';
import BlockStore from './BlockStore';
import UpdateService from './UpdateService';

class EraseTool extends Tool {
  constructor(store: BlockStore, update: UpdateService) {
    super(store, ToolName.Erase);

    this.eraser = new Eraser(store, update);
  }

  onPointerDown({ eventObjectName }: ToolInfo) {
    this.eraser.erase([eventObjectName]);
  }

  private eraser: Eraser;
}

export default EraseTool;
