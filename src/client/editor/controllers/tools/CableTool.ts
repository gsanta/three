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
import DrawHouseWiring from '../../use_cases/wiring/DrawHouseWiring';
import { setEditMode } from '../../stores/block/blockSlice';

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

    this.currentCableId = null;

    this.drawHouseWiring = new DrawHouseWiring(factoryService, sceneService, sceneStore, update);

    this.factoryService = factoryService;

    this.joinPoles = new JoinPoles(blockStore, sceneStore, factoryService, update);

    this.scene = sceneStore;

    this.sceneService = sceneService;

    this.selector = new Selector(blockStore, sceneService, sceneStore, update);
    this.updateService = update;
  }

  onDeselect() {
    store.dispatch(updateTemporaryCables(undefined));
    store.dispatch(setEditMode(undefined));

    this.isDrawingCable = false;
  }

  onPointerDown(info: ToolInfo) {
    const blockId = info.eventObject?.userData.modelId;

    if (!blockId) {
      store.dispatch(setEditMode(undefined));
      return;
    }

    const block = this.blockStore.getBlock(blockId);

    if (block.category === 'building-bases') {
      store.dispatch(setEditMode({ blockId }));
    } else if (block.category === 'walls') {
      this.currentCableId = this.drawHouseWiring.execute(blockId, this.currentCableId, info.clientX, info.clientY);
    } else if (this.isDrawingCable) {
      if (blockId) {
        const mesh = this.scene.getObj3d(blockId);
        const targetBlock = this.blockStore.getBlock(blockId);

        const targetPartIndex = this.checkPartIntersection(targetBlock, mesh, info.clientX, info.clientY);

        const selectedBlockId = this.blockStore.getSelectedRootBlockIds()[0];
        const sourcePartIndex = this.blockStore.getSelectedPartIndexes()[selectedBlockId]?.[0];

        if (!sourcePartIndex || !targetPartIndex) {
          return;
        }

        const block1 = this.blockStore.getBlock(selectedBlockId);
        const block2 = this.blockStore.getBlock(blockId);

        if (targetBlock.partDetails[targetPartIndex || '']?.category === 'pin') {
          this.joinPoles.join(block1, block2, [[sourcePartIndex, targetPartIndex]]);
        }
      }
    } else {
      this.selector.select(blockId, info.clientX, info.clientY);
    }
  }

  onPointerMove({ pos }: ToolInfo) {
    const selectedBlockId = this.blockStore.getSelectedRootBlockIds()[0];

    if (!selectedBlockId) {
      return;
    }

    const block = this.blockStore.getBlock(selectedBlockId);
    const selectedPart = this.blockStore.getSelectedPart(selectedBlockId);

    if (selectedPart) {
      this.isDrawingCable = true;
      const mesh1 = this.scene.getObj3d(selectedBlockId);
      const pinMesh1 = MeshUtils.findByName(mesh1, block.partDetails[selectedPart]?.name);

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

  private currentCableId: string | null;

  private drawHouseWiring: DrawHouseWiring;

  private factoryService: FactoryService;

  private isDrawingCable = false;

  private joinPoles: JoinPoles;

  private scene: SceneStore;

  private selector: Selector;

  private updateService: TransactionService;
}

export default CableTool;
