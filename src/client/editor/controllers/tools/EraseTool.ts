import { ToolInfo } from '@/client/editor/models/tool/Tool';
import ToolName from '@/client/editor/models/tool/ToolName';
import EraseBlock from '../../use_cases/erase/EraseBlock';
import BlockStore from '../../stores/block/BlockStore';
import TransactionService from '../../services/transaction/TransactionService';
import HoverTool from './HoverTool';
import SceneService from '../../ui/scene/service/SceneService';

class EraseTool extends HoverTool {
  constructor(store: BlockStore, sceneService: SceneService, update: TransactionService) {
    super(store, sceneService, update, ToolName.Erase);

    this.eraser = new EraseBlock(store, update);
  }

  onPointerDown({ eventObject }: ToolInfo) {
    this.eraser.erase([eventObject?.userData.modelId || '']);
  }

  private eraser: EraseBlock;
}

export default EraseTool;
