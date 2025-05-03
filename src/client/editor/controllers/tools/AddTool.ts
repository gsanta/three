import { ToolInfo } from '../../models/tool/Tool';
import ToolName from '../../models/tool/ToolName';
import TransactionService from '../../services/transaction/TransactionService';
import HoverTool from './HoverTool';
import SceneService from '../../ui/scene/service/SceneService';
import BlockData from '@/client/editor/models/block/BlockData';
import BlockConstantData from '@/client/editor/models/block/BlockConstantData';
import Num3 from '@/client/editor/models/math/Num3';
import BlockStore from '@/client/editor/stores/block/BlockStore';
import { BlockCategoryName } from '@/client/editor/models/block/BlockCategoryName';
import AddPole from '../../use_cases/block/add/AddPole';
import FactoryService from '@/client/editor/services/factory/FactoryService';
import SceneStore from '@/client/editor/ui/scene/SceneStore';
import Vector from '@/client/editor/models/math/Vector';
import AddToPlain from '../../use_cases/block/add/AddToPlain';
import AddToAnchor from '../../use_cases/block/add/AddToAnchor';
import AddToAnchorAsChild from '../../use_cases/block/add/AddToAnchorAsChild';

class AddTool extends HoverTool {
  constructor(
    block: BlockStore,
    factoryService: FactoryService,
    sceneStore: SceneStore,
    sceneService: SceneService,
    update: TransactionService,
  ) {
    super(block, sceneService, update, ToolName.Add, 'BiPlus');

    this.addPoles = new AddPole(block, factoryService, sceneService, sceneStore, update);
    this.addToPlain = new AddToPlain(factoryService);
    this.addToAnchor = new AddToAnchor(factoryService, sceneStore);
    this.addToAnchorAsChild = new AddToAnchorAsChild(factoryService, sceneStore);
  }

  onPointerUp({ pos }: ToolInfo) {
    const { selectedBlockName } = this.blockStore.getBlockSettings();

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
    this.position = pos.toArray();
    this.newBlockCategory = newBlockType.category;

    this.add();
  }

  private add() {
    if (this.newBlockType && this.position) {
      const edit = this.update.createTransaction();

      switch (this.newBlockCategory) {
        case 'poles':
          this.addPoles.execute({ edit, newBlockType: this.newBlockType, position: new Vector(this.position) });
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
            this.addToPlain.execute({ edit, newBlockType: this.newBlockType, position: new Vector(this.position) });
          }
          break;
        case 'houses':
          this.addToPlain.execute({ edit, newBlockType: this.newBlockType, position: new Vector(this.position) });
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

  private addPoles: AddPole;

  private addToPlain: AddToPlain;

  private addToAnchor: AddToAnchor;

  private addToAnchorAsChild: AddToAnchorAsChild;

  private targetBlock?: BlockData;

  private targetPartName?: string;

  private newBlockType?: BlockConstantData;

  private position?: Num3;

  private newBlockCategory: BlockCategoryName | undefined;
}

export default AddTool;
