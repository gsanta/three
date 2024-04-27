import Tool, { ToolInfo } from '@/client/editor/features/tool/service/Tool';
import ToolName from '@/client/editor/features/tool/state/ToolName';
import Eraser from './Eraser';
import BlockStore from '../../BlockStore';
import UpdateService from '../../services/update/UpdateService';

class EraseTool extends Tool {
  constructor(store: BlockStore, update: UpdateService) {
    super(store, update, ToolName.Erase);

    this.eraser = new Eraser(store, update);
  }

  onPointerDown({ eventObjectName }: ToolInfo) {
    this.eraser.erase([eventObjectName]);
  }

  private eraser: Eraser;
}

export default EraseTool;
