import { ToolInfo } from '../../types/Tool';
import ToolName from '../../types/ToolName';
import VectorUtils, { addVector } from '@/client/editor/utils/vectorUtils';
import { toRadian } from '@/client/editor/utils/mathUtils';
import Num3 from '@/client/editor/types/Num3';
import Block from '@/client/editor/types/Block';
import SceneStore from '@/client/editor/components/scene/SceneStore';
import MoveBlock from '../../use_cases/block/move/MoveBlock';
import TransactionService from '../../services/transaction/TransactionService';
import BlockStore from '../../stores/block/BlockStore';
import { store } from '@/client/common/utils/store';
import { updateSelectTool } from '../../stores/tool/toolSlice';
import SceneService from '../../components/scene/service/SceneService';
import Selector from '../../use_cases/block/Selector';
import ToolStore from '../../stores/tool/ToolStore';
import HoverTool from './HoverTool';
import BlockMover from '../../use_cases/block/move/BlockMover';
import PoleMover from '../../use_cases/block/move/PoleMover';

class SelectTool extends HoverTool {
  constructor(
    blockStore: BlockStore,
    scene: SceneService,
    sceneStore: SceneStore,
    toolStore: ToolStore,
    update: TransactionService,
  ) {
    super(blockStore, scene, update, ToolName.Select, 'BiRectangle');

    this.move = new MoveBlock(blockStore, update, sceneStore, toolStore);
    this.selector = new Selector(blockStore, scene, sceneStore, update);
    this.toolStore = toolStore;

    this.movers.poles = new PoleMover(blockStore, sceneStore);
  }

  onPointerUp(info: ToolInfo) {
    if (!info.isDragHappened && VectorUtils.size(info.drag) === 0) {
      this.selector.select(info.eventObject?.userData.modelId, info.clientX, info.clientY);
    }
  }

  onPointerLeave(info: ToolInfo) {
    const block = this.blockStore.getBlocks()[info.eventObject?.userData.modelId || ''];

    if (block) {
      this.update.getTransaction().updateBlock(block.id, { isHovered: false }).commit();
    }
  }

  onDrag(info: ToolInfo) {
    this.move.perform(info.drag, info.dragDelta);
    this.isMoved = true;

    const edit = this.update.getTransaction();

    const selectedBlock = this.blockStore.getSelectedRootBlockIds()[0];

    if (selectedBlock) {
      edit.updateBlock(selectedBlock, { notifyOnRender: true });

      edit.commit(false);
    }
  }

  onDragEnd() {
    const selectedBlockIds = this.blockStore.getSelectedRootBlockIds();
    const blocks = this.blockStore.getBlocks();

    const edit = this.update.getTransaction();

    const drag = this.toolStore.getSelectOptions().drag;

    selectedBlockIds.forEach((blockId) =>
      edit.updateBlock(blockId, { position: addVector(blocks[blockId].position, drag) }),
    );

    edit.commit(false);

    store.dispatch(updateSelectTool({ drag: [0, 0, 0] }));
  }

  onDeselect() {
    this.update.getTransaction().select(null).commit(false);
  }

  scaleMesh(scale: number, block: Block) {
    const { selectedSettings } = this.blockStore.getBlockSettings();
    const settings = selectedSettings[block.category];

    const index = VectorUtils.getAxisIndex('x');
    const newScale = [...block.scale] as Num3;
    newScale[index] = settings.scale[index] * scale;

    this.update
      .getTransaction()
      .updateBlock(block.id, {
        scale: newScale,
      })
      .commit();
  }

  rotateMesh(axis: 'x' | 'y' | 'z', rotation: number) {
    const selectedBlockIds = this.blockStore.getSelectedRootBlockIds();

    if (selectedBlockIds.length === 0) {
      return;
    }

    let block = this.blockStore.getBlocks()[selectedBlockIds[0]];

    const index = VectorUtils.getAxisIndex(axis);
    const newRotation = [...block.rotation] as [number, number, number];
    newRotation[index] += toRadian(rotation);

    const edit = this.update.getTransaction().updateBlock(block.id, {
      rotation: newRotation,
      notifyOnRender: true,
    });

    block = this.blockStore.getBlocks()[selectedBlockIds[0]];

    this.isRotated = true;
    edit.commit();
  }

  onRendered() {
    if (this.isRotated || this.isMoved) {
      this.isRotated = false;
      this.isMoved = false;

      const selectedBlockIds = this.blockStore.getSelectedRootBlockIds();

      const edit = this.update.getTransaction();

      const block = this.blockStore.getBlocks()[selectedBlockIds[0]];

      const mover = this.movers[block.category];

      if (mover) {
        mover.move(edit, block);
      }

      edit.commit();
    }
  }

  private move: MoveBlock;

  private selector: Selector;

  private toolStore: ToolStore;

  private movers: Partial<Record<string, BlockMover>> = {};

  private isRotated = false;

  private isMoved = false;
}

export default SelectTool;
