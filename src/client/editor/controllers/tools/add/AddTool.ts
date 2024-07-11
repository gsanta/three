import { ToolInfo } from '../../../types/Tool';
import ToolName from '../../../types/ToolName';
import BlockStore from '../../../stores/block/BlockStore';
import TransactionService from '../../../services/transaction/TransactionService';
import SceneStore from '../../../components/scene/SceneStore';
import FactoryService from '../../../services/factory/FactoryService';
import HoverTool from '../HoverTool';
import SceneService from '../../../components/scene/service/SceneService';
import AddWallBlock from './AddWallBlock';
import AddBlock from './AddBlock';
import AddRoofBlock from './AddRoofBlock';
import AddHomeElectricsBlock from './AddHomeElectricsBlock';
import AddRoadBlock from './AddRoadBlock';
import AddSocketBlock from './AddSocketBlock';
import AddWeatherHeadBlock from './AddWeatherHeadBlock';
import AddBlockToPlain from './AddBlockToPlain';
import AddPoleBlock from './AddPoleBlock';

class AddTool extends HoverTool {
  constructor(
    blockStore: BlockStore,
    factoryService: FactoryService,
    sceneService: SceneService,
    sceneStore: SceneStore,
    update: TransactionService,
  ) {
    super(blockStore, sceneService, update, ToolName.Add, 'BiPlus');

    this.blockStore = blockStore;

    // this.addBlockToPlain = new AddBlockToPlain(blockStore, factoryService, sceneStore, update);

    this.addBlock = [
      new AddBlockToPlain(factoryService, update),
      new AddHomeElectricsBlock(blockStore, factoryService, sceneService, sceneStore, update),
      new AddPoleBlock(blockStore, factoryService, sceneStore, update),
      new AddRoadBlock(blockStore, factoryService, sceneStore, update),
      new AddRoofBlock(blockStore, factoryService, sceneStore, update),
      new AddSocketBlock(blockStore, factoryService, sceneService, sceneStore, update),
      new AddWallBlock(blockStore, factoryService, sceneStore, update),
      new AddWeatherHeadBlock(blockStore, factoryService, sceneService, sceneStore, update),
    ];
  }

  onPointerUp({ clientX, clientY, pos }: ToolInfo) {
    const { selectedBlockName } = this.blockStore.getBlockSettings();
    const newBlockType = this.blockStore.getBlockType(selectedBlockName);

    if (!selectedBlockName || !newBlockType) {
      return;
    }

    const hovered = this.blockStore.getHovered();
    const targetBlockId = hovered?.block;
    const targetPartIndex = hovered?.partIndex;

    const targetBlock = targetBlockId ? this.blockStore.getBlock(targetBlockId) : undefined;

    const selectedAddBlock = this.addBlock.find(
      (addBlock) =>
        addBlock.sourceCategories.includes(newBlockType.category) &&
        addBlock.targetCategories.includes(targetBlock?.category || 'plain'),
    );

    selectedAddBlock?.perform({
      clientX,
      clientY,
      targetBlock,
      targetPartIndex,
      newBlockType,
      position: pos.toArray(),
    });

    this.lastAddblock = selectedAddBlock;

    // if (!targetBlockId || !this.addToBlock[this.blockStore.getBlock(targetBlockId).category]) {
    //   const applyPosition = this.getAddBlockStrategy.getStrategy({
    //     targetBlock: hovered?.block ? this.blockStore.getBlock(hovered?.block) : undefined,
    //     targetPartIndex: hovered?.partIndex,
    //     newBlockType: blockType,
    //   });

    //   const edit = this.update.getTransaction();

    //   switch (applyPosition) {
    //     case 'source-origin-target-plane':
    //       this.addBlockToPlain.perform(edit, pos, selectedBlockName);
    //       break;
    //     case 'source-origin-target-pointer-pos':
    //       this.addBlockToPointerPos.perform(
    //         edit,
    //         hovered?.block || '',
    //         hovered?.partIndex || '',
    //         blockType?.type || '',
    //         clientX,
    //         clientY,
    //       );
    //       break;
    //     case 'source-slot-target-slot':
    //       this.addSlotToSlot.perform(hovered?.block || '', hovered?.partIndex || '', selectedBlockName);
    //       break;
    //     case 'source-origin-target-slot':
    //       this.addBlockToSlot.perform(edit, hovered?.block || '', hovered?.partIndex || '', selectedBlockName);
    //       break;
    //   }

    //   edit.commit();
    // } else {
    //   const targetBlock = this.blockStore.getBlock(targetBlockId);
    //   this.addToBlock[targetBlock.category].perform(targetBlock, hovered?.partIndex, blockType, clientX, clientY);
    // }
  }

  onRendered() {
    try {
      if (this.lastAddblock) {
        this.lastAddblock.performAfterRender();
      }
    } finally {
      this.lastAddblock = undefined;
    }
  }

  private lastAddblock?: AddBlock;

  private addBlock: AddBlock[] = [];
}

export default AddTool;
