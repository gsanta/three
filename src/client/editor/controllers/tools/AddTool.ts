import { ToolEventName, ToolInfo } from '../../models/tool/Tool';
import ToolName from '../../models/tool/ToolName';
import TransactionService from '../../services/transaction/TransactionService';
import HoverTool from './HoverTool';
import SceneService from '../../ui/scene/service/SceneService';
import BlockData from '@/client/editor/models/block/BlockData';
import BlockConstantData from '@/client/editor/models/block/BlockConstantData';
import BlockStore from '@/client/editor/stores/block/BlockStore';
import Vector from '@/client/editor/models/math/Vector';
import GridStore from '../../stores/grid/GridStore';
import { Vector3 } from 'three';
import BlockTypeStore from '../../stores/blockType/BlockTypeStore';
import AddService from './AddService';

class AddTool extends HoverTool {
  constructor(
    addService: AddService,
    blockStore: BlockStore,
    blockTypeStore: BlockTypeStore,
    gridStore: GridStore,
    sceneService: SceneService,
    update: TransactionService,
  ) {
    super(blockStore, sceneService, update, ToolName.Add, 'BiPlus');

    this.addService = addService;

    this.blockTypeStore = blockTypeStore;

    this.gridStore = gridStore;
  }

  onPointerUp({ pos }: ToolInfo) {
    const activeBlockType = this.blockTypeStore.getAddAction()?.blockType;

    const position = this.getPosition(pos);

    if (!activeBlockType) {
      return;
    }

    const hovered = this.blockStore.getHovered();
    const targetBlockId = hovered?.block;
    const targetPartIndex = hovered?.partIndex;

    const targetBlock = targetBlockId ? this.blockStore.getBlock(targetBlockId) : undefined;

    const newBlockType = this.blockStore.getBlockType(activeBlockType);

    this.targetBlock = targetBlock;
    this.targetPartName = targetPartIndex;
    this.newBlockType = newBlockType;
    this.position = position;

    this.add();
  }

  onMeshRendered(name: ToolEventName): void {
    if (name === 'onPointerUp') {
      this.addService.getActiveAddCommand()?.executeAfterRender?.();
    }
  }

  private add() {
    if (this.newBlockType && this.position) {
      this.addService.add({
        newBlockTemplate: this.newBlockType,
        position: this.position,
        targetBlock: this.targetBlock,
        targetPartName: this.targetPartName,
      });
    }
  }

  private getPosition(pos: Vector3) {
    const offsetX = this.gridStore.getGridOffset()[0] + this.gridStore.getGridSize() / 2;
    const offsetZ = this.gridStore.getGridOffset()[1] + this.gridStore.getGridSize() / 2;

    const positiveX = pos.x - offsetX;
    const positiveZ = pos.z - offsetZ;

    const floorX = Math.floor(positiveX / this.gridStore.getGridSize()) * this.gridStore.getGridSize();
    const floorZ = Math.floor(positiveZ / this.gridStore.getGridSize()) * this.gridStore.getGridSize();

    const centerX = floorX + this.gridStore.getGridSize() / 2;
    const centerZ = floorZ + this.gridStore.getGridSize() / 2;

    const finalX = centerX + offsetX;
    const finalZ = centerZ + offsetZ;

    return new Vector([finalX, pos.y, finalZ]);
  }

  private addService: AddService;

  private blockTypeStore: BlockTypeStore;

  private gridStore: GridStore;

  private targetBlock?: BlockData;

  private targetPartName?: string;

  private newBlockType?: BlockConstantData;

  private position?: Vector;
}

export default AddTool;
