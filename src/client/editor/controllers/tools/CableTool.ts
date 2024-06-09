import { ToolInfo } from '@/client/editor/types/Tool';
import ToolName from '@/client/editor/types/ToolName';
import SceneStore from '@/client/editor/components/scene/SceneStore';
import JoinPoles from '../../use_cases/block/JoinPoles';
import TransactionService from '../../services/transaction/TransactionService';
import BlockStore from '../../stores/block/BlockStore';
import FactoryService from '../../services/factory/FactoryService';
import Selector from '../../use_cases/block/Selector';
import SceneService from '../../components/scene/SceneService';
import MeshUtils from '../../utils/MeshUtils';
import { updateTemporaryCables } from '../../stores/block/temporarySlice';
import { Vector3 } from 'three';
import { store } from '@/client/common/utils/store';
import HoverTool from './HoverTool';

class CableTool extends HoverTool {
  constructor(
    blockStore: BlockStore,
    factoryService: FactoryService,
    sceneService: SceneService,
    sceneStore: SceneStore,
    update: TransactionService,
  ) {
    super(blockStore, sceneService, sceneStore, update, ToolName.Cable);

    this.blockStore = blockStore;

    this.factoryService = factoryService;

    this.joinPoles = new JoinPoles(blockStore, sceneStore, factoryService, update);

    this.scene = sceneStore;

    this.sceneService = sceneService;

    this.selector = new Selector(blockStore, sceneService, sceneStore, update);
    this.updateService = update;
  }

  onDeselect() {
    store.dispatch(updateTemporaryCables(undefined));
    this.isDrawingCable = false;
  }

  onPointerDown(info: ToolInfo) {
    const blockId = info.eventObject?.userData.modelId;
    if (this.isDrawingCable) {
      if (blockId) {
        const mesh = this.scene.getObj3d(blockId);
        const targetBlock = this.blockStore.getBlock(blockId);

        const partName = this.checkPartIntersection(mesh, info.clientX, info.clientY);

        const selectedBlockId = this.blockStore.getSelectedRootBlockIds()[0];
        const block1 = this.blockStore.getBlock(selectedBlockId);
        const block2 = this.blockStore.getBlock(info.eventObject?.userData.modelId);

        if (targetBlock.partDetails[partName || '']?.type === 'pin') {
          const pairs: [string, string][] = block1.category === 'weather-heads' ? [['#2', '#5']] : [['#5', '#2']];
          this.joinPoles.join(block1, block2, pairs);
        }
      }
    } else {
      this.selector.select(info.eventObject?.userData.modelId, info.clientX, info.clientY);
    }
  }

  onPointerMove({ pos }: ToolInfo) {
    const selectedBlockId = this.blockStore.getSelectedRootBlockIds()[0];
    const selectedPart = this.blockStore.getSelectedPart(selectedBlockId);

    if (selectedPart) {
      this.isDrawingCable = true;
      const mesh1 = this.scene.getObj3d(selectedBlockId);
      const pinMesh1 = MeshUtils.findByName(mesh1, selectedPart);

      const pos2 = new Vector3();
      pinMesh1.getWorldPosition(pos2);

      store.dispatch(
        updateTemporaryCables([
          [pos.x, pos.y, pos.z],
          [pos2.x, pos2.y, pos2.z],
        ]),
      );
    }
  }

  onExecute() {
    const blocks = this.store.getBlocks();
    const selectedBlockIds = this.store.getSelectedRootBlockIds();

    const polesIds = selectedBlockIds.filter((id) => blocks[id].category === 'poles');

    if (polesIds.length < 2) {
      return;
    }

    const joinPoles = new JoinPoles(this.blockStore, this.scene, this.factoryService, this.updateService);

    joinPoles.join(blocks[polesIds[0]], blocks[polesIds[1]], [
      ['#2', '#2'],
      ['#3', '#3'],
      ['#4', '#4'],
    ]);
  }

  private blockStore: BlockStore;

  private factoryService: FactoryService;

  private isDrawingCable = false;

  private joinPoles: JoinPoles;

  private scene: SceneStore;

  private selector: Selector;

  private updateService: TransactionService;
}

export default CableTool;
