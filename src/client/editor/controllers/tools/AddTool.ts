import { ToolInfo } from '../../models/tool/Tool';
import ToolName from '../../models/tool/ToolName';
import TransactionService from '../../services/transaction/TransactionService';
import HoverTool from './HoverTool';
import SceneService from '../../ui/scene/service/SceneService';
import BlockData from '@/client/editor/models/block/BlockData';
import BlockConstantData from '@/client/editor/models/block/BlockConstantData';
import BlockStore from '@/client/editor/stores/block/BlockStore';
import { BlockCategoryName } from '@/client/editor/models/block/BlockCategoryName';
import AddPole from '../../use_cases/block/add/AddPole';
import FactoryService from '@/client/editor/services/factory/FactoryService';
import SceneStore from '@/client/editor/ui/scene/SceneStore';
import Vector from '@/client/editor/models/math/Vector';
import AddToPlain from '../../use_cases/block/add/AddToPlain';
import AddToAnchor from '../../use_cases/block/add/AddToAnchor';
import AddToAnchorAsChild from '../../use_cases/block/add/AddToAnchorAsChild';
import GridStore from '../../stores/grid/GridStore';
import { Vector3 } from 'three';

class AddTool extends HoverTool {
  constructor(
    block: BlockStore,
    factoryService: FactoryService,
    gridStore: GridStore,
    sceneStore: SceneStore,
    sceneService: SceneService,
    update: TransactionService,
  ) {
    super(block, sceneService, update, ToolName.Add, 'BiPlus');

    this.gridStore = gridStore;

    this.addPoles = new AddPole(block, factoryService, sceneService, sceneStore, update);
    this.addToPlain = new AddToPlain(factoryService);
    this.addToAnchor = new AddToAnchor(factoryService, sceneStore);
    this.addToAnchorAsChild = new AddToAnchorAsChild(factoryService, sceneStore);
  }

  onPointerUp({ pos }: ToolInfo) {
    const { selectedBlockName } = this.blockStore.getBlockSettings();

    const position = this.getPosition(pos);

    if (!selectedBlockName) {
      return;
    }

    const hovered = this.blockStore.getHovered();
    const targetBlockId = hovered?.block;
    const targetPartIndex = hovered?.partIndex;

    const targetBlock = targetBlockId ? this.blockStore.getBlock(targetBlockId) : undefined;

    const newBlockType = this.blockStore.getBlockType(selectedBlockName);

    this.targetBlock = targetBlock;
    this.targetPartName = targetPartIndex;
    this.newBlockType = newBlockType;
    this.position = position;
    this.newBlockCategory = newBlockType.category;

    this.add();
  }

  private add() {
    if (this.newBlockType && this.position) {
      const edit = this.update.createTransaction();

      switch (this.newBlockCategory) {
        case 'poles':
          this.addPoles.execute({ edit, newBlockType: this.newBlockType, position: this.position });
          break;
        case 'roads':
          if (this.targetBlock && this.targetPartName) {
            this.addToAnchor.execute({
              edit,
              newBlockType: this.newBlockType,
              newBlockAnchorRole: 'road-slot',
              to: {
                block: this.targetBlock,
                anchorPartName: this.targetPartName,
              },
            });
          } else {
            this.addToPlain.execute({ edit, newBlockType: this.newBlockType, position: this.position });
          }
          break;
        case 'houses':
        case 'humans':
          this.addToPlain.execute({ edit, newBlockType: this.newBlockType, position: this.position });
          break;
        case 'transformers':
          if (this.targetBlock && this.targetPartName) {
            this.addToAnchorAsChild.execute({
              edit,
              newBlockType: this.newBlockType,
              newBlockAnchorName: 'Join',
              to: {
                block: this.targetBlock,
                anchorPartName: this.targetPartName,
              },
            });
          }
          break;
      }

      edit.commit();
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

    console.log('floorX: ' + floorX);

    return new Vector([finalX, pos.y, finalZ]);
  }

  private addPoles: AddPole;

  private addToPlain: AddToPlain;

  private addToAnchor: AddToAnchor;

  private addToAnchorAsChild: AddToAnchorAsChild;

  private gridStore: GridStore;

  private targetBlock?: BlockData;

  private targetPartName?: string;

  private newBlockType?: BlockConstantData;

  private position?: Vector;

  private newBlockCategory: BlockCategoryName | undefined;
}

export default AddTool;
