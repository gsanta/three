import { ToolInfo } from '@/client/editor/models/Tool';
import ToolName from '@/client/editor/models/ToolName';
import SceneStore from '@/client/editor/components/scene/SceneStore';
import JoinPoles from '../../use_cases/block/JoinPoles';
import TransactionService from '../../services/transaction/TransactionService';
import BlockStore from '../../stores/block/BlockStore';
import FactoryService from '../../services/factory/FactoryService';
import SelectBlock from '../../use_cases/block/SelectBlock';
import SceneService from '../../components/scene/service/SceneService';
import MeshUtils from '../../utils/MeshUtils';
import { updateTemporaryCables } from '../../stores/block/temporarySlice';
import { Vector3 } from 'three';
import { store } from '@/client/common/utils/store';
import HoverTool from './HoverTool';
import DrawHouseWiring from '../../use_cases/wiring/DrawHouseWiring';
import { setEditMode } from '../../stores/editorSlice';
import BlockType from '../../types/BlockType';

class CableTool extends HoverTool {
  constructor(
    blockStore: BlockStore,
    factoryService: FactoryService,
    sceneService: SceneService,
    sceneStore: SceneStore,
    update: TransactionService,
  ) {
    super(blockStore, sceneService, update, ToolName.Cable);

    this.blockStore = blockStore;

    this.drawHouseWiring = new DrawHouseWiring(blockStore, factoryService, sceneService, sceneStore, update);

    this.factoryService = factoryService;

    this.joinPoles = new JoinPoles(blockStore, sceneStore, factoryService, update);

    this.scene = sceneStore;

    this.sceneService = sceneService;

    this.selector = new SelectBlock(blockStore, sceneService, sceneStore, update);
    this.updateService = update;
  }

  onDeselect() {
    store.dispatch(updateTemporaryCables(undefined));
    store.dispatch(setEditMode({ editingMode: null, editingTargetBlock: null }));

    this.isDrawingCable = false;
  }

  onPointerUp(info: ToolInfo) {
    const blockId = info.eventObject?.userData.modelId;

    if (info.isDragHappened) {
      return;
    }

    if (!blockId) {
      store.dispatch(setEditMode({ editingMode: null, editingTargetBlock: null }));
      return;
    }

    if (this.isDrawingCable) {
      if (blockId) {
        const targetBlock = this.blockStore.getBlock(blockId);

        const partIndex = this.checkPartIntersection(blockId, info.clientX, info.clientY);

        const selectedBlockId = this.blockStore.getSelectedRootBlockIds()[0];
        const sourcePartIndex = this.blockStore.getSelectedPartIndexes()[selectedBlockId]?.[0];

        if (!sourcePartIndex || !partIndex) {
          return;
        }

        const block1 = this.blockStore.getBlock(selectedBlockId);
        const block2 = this.blockStore.getBlock(blockId);

        const edit = this.update.createTransaction();

        if (targetBlock.partDetails[partIndex || '']?.roles === 'pin') {
          this.joinPoles.join(block1, block2, [[sourcePartIndex, partIndex]]);
        }

        edit.commit();
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
    const blocks = this.blockStore.getBlocks();
    const selectedBlockIds = this.blockStore.getSelectedRootBlockIds();

    const polesIds = selectedBlockIds.filter((id) => blocks[id].category === 'poles');

    if (polesIds.length < 2) {
      return;
    }

    const joinPoles = new JoinPoles(this.blockStore, this.scene, this.factoryService, this.updateService);

    joinPoles.join(blocks[polesIds[0]], blocks[polesIds[1]], [
      ['Pole1Pin1', 'Pole1Pin1'],
      ['Pole1Pin2', 'Pole1Pin2'],
      ['Pole1Pin3', 'Pole1Pin3'],
    ]);
  }

  private getRootBlock(block: BlockType) {
    if (block.category === 'building-bases') {
      return block;
    }

    if (block.category === 'walls') {
      const parentId = block.parentConnection?.block;

      return this.blockStore.getBlock(parentId);
    }

    return undefined;
  }

  private drawHouseWiring: DrawHouseWiring;

  private factoryService: FactoryService;

  private isDrawingCable = false;

  private joinPoles: JoinPoles;

  private scene: SceneStore;

  private selector: SelectBlock;

  private updateService: TransactionService;
}

export default CableTool;
