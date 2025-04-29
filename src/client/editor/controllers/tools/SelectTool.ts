import { ToolInfo } from '../../models/Tool';
import ToolName from '../../models/ToolName';
import VectorUtils, { addVector } from '@/client/editor/utils/vectorUtils';
import { toRadian } from '@/client/editor/utils/mathUtils';
import Num3 from '@/client/editor/models/Num3';
import BlockType from '@/client/editor/models/BlockType';
import SceneStore from '@/client/editor/components/scene/SceneStore';
import MoveBlock from '../../use_cases/block/move/MoveBlock';
import TransactionService from '../../services/transaction/TransactionService';
import BlockStore from '../../stores/block/BlockStore';
import { store } from '@/client/common/utils/store';
import { updateSelectTool } from '../../stores/tool/toolSlice';
import SceneService from '../../components/scene/service/SceneService';
import SelectBlock from '../../use_cases/block/SelectBlock';
import ToolStore from '../../stores/tool/ToolStore';
import HoverTool from './HoverTool';
import BlockMover from '../../use_cases/block/move/BlockMover';
import BlockCategoryStore from '../../stores/blockCategory/BlockCategoryStore';

class SelectTool extends HoverTool {
  constructor(
    blockStore: BlockStore,
    blockCategoryStore: BlockCategoryStore,
    scene: SceneService,
    sceneStore: SceneStore,
    toolStore: ToolStore,
    update: TransactionService,
    sceneService: SceneService,
  ) {
    super(blockStore, scene, update, ToolName.Select, 'BiRectangle');

    this.blockCategoryStore = blockCategoryStore;
    this.sceneStore = sceneStore;
    this.sceneService = sceneService;

    this.move = new MoveBlock(blockStore, blockCategoryStore, update, sceneStore, toolStore);
    this.selector = new SelectBlock(blockStore, blockCategoryStore, scene, sceneStore, update);
    this.toolStore = toolStore;
  }

  onPointerUp(info: ToolInfo) {
    if (!info.isDragHappened && VectorUtils.size(info.drag) === 0) {
      this.selector.select(info.eventObject?.userData.modelId, info.clientX, info.clientY);
    }
  }

  onPointerLeave(info: ToolInfo) {
    const block = this.blockStore.getBlocks()[info.eventObject?.userData.modelId || ''];

    if (block) {
      this.update.createTransaction().updateBlock(block.id, { isHovered: false }).commit();
    }
  }

  onDrag(info: ToolInfo) {
    this.move.perform(info.drag, info.dragDelta);
    this.isMoved = true;

    const edit = this.update.createTransaction();

    const selectedBlockId = this.blockCategoryStore.getSelectedRootBlockIds()[0];

    if (selectedBlockId) {
      // edit.updateBlock(selectedBlock, { notifyOnRender: true });
      const selectedBlock = this.blockStore.getBlock(selectedBlockId);

      selectedBlock.conduitConnections.forEach((connection) => {
        edit.updateBlock(connection.block, { isDirty: true });
      });

      edit.commit(false);
    }
  }

  onDragEnd() {
    const selectedBlockIds = this.blockCategoryStore.getSelectedRootBlockIds();
    const blocks = this.blockStore.getBlocks();

    const edit = this.update.createTransaction();

    const drag = this.toolStore.getSelectOptions().drag;

    selectedBlockIds.forEach((blockId) =>
      edit.updateBlock(blockId, { position: addVector(blocks[blockId].position, drag) }),
    );

    const selectedBlockId = this.blockCategoryStore.getSelectedRootBlockIds()[0];

    if (selectedBlockId) {
      // edit.updateBlock(selectedBlock, { notifyOnRender: true });
      const selectedBlock = this.blockStore.getBlock(selectedBlockId);

      selectedBlock.conduitConnections.forEach((connection) => {
        edit.updateBlock(connection.block, { isDirty: true });
      });

      edit.commit(false);
    }

    edit.commit(false);

    store.dispatch(updateSelectTool({ drag: [0, 0, 0] }));
  }

  onDeselect() {
    const edit = this.update.createTransaction();

    edit.select([]);

    edit.commit(false);
  }

  scaleMesh(scale: number, block: BlockType) {
    const { selectedSettings } = this.blockStore.getBlockSettings();
    const settings = selectedSettings[block.category];

    const index = VectorUtils.getAxisIndex('x');
    const newScale = [...block.scale] as Num3;
    newScale[index] = settings.scale[index] * scale;

    this.update
      .createTransaction()
      .updateBlock(block.id, {
        scale: newScale,
      })
      .commit();
  }

  rotateMesh(axis: 'x' | 'y' | 'z', rotation: number) {
    const selectedBlockIds = this.blockCategoryStore.getSelectedRootBlockIds();

    if (selectedBlockIds.length === 0) {
      return;
    }

    let block = this.blockStore.getBlocks()[selectedBlockIds[0]];

    const index = VectorUtils.getAxisIndex(axis);
    const newRotation = [...block.rotation] as [number, number, number];
    newRotation[index] += toRadian(rotation);

    const edit = this.update.createTransaction().updateBlock(block.id, {
      rotation: newRotation,
      notifyOnRender: true,
    });

    block = this.blockStore.getBlocks()[selectedBlockIds[0]];

    block.conduitConnections.forEach((child) => {
      edit.updateBlock(child.block, { isDirty: true });
    });

    this.isRotated = true;
    edit.commit();
  }

  onRendered() {
    if (this.isMoved) {
      // this.isRotated = false;
      // this.isMoved = false;
      // const selectedBlockIds = this.blockStore.getSelectedRootBlockIds();
      // const edit = this.update.createTransaction();
      // const block = this.blockStore.getBlocks()[selectedBlockIds[0]];
      // const mover = this.movers[block.category];
      // // if (mover) {
      // //   mover.move(edit, block);
      // // }
      // edit.commit();
    }
  }

  private move: MoveBlock;

  private selector: SelectBlock;

  private toolStore: ToolStore;

  private movers: Partial<Record<string, BlockMover>> = {};

  private isRotated = false;

  private isMoved = false;

  private sceneStore: SceneStore;

  private blockCategoryStore: BlockCategoryStore;

  sceneService: SceneService;
}

export default SelectTool;
