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
import SceneService from '../../components/scene/SceneService';
import Selector from '../../use_cases/block/Selector';
import ToolStore from '../../stores/tool/ToolStore';
import MoveBlockToSlot from '../../use_cases/block/MoveBlockToSlot';
import HoverTool from './HoverTool';

class SelectTool extends HoverTool {
  constructor(
    blockStore: BlockStore,
    scene: SceneService,
    sceneStore: SceneStore,
    toolStore: ToolStore,
    update: TransactionService,
  ) {
    super(blockStore, scene, sceneStore, update, ToolName.Select, 'BiRectangle');

    this.move = new MoveBlock(blockStore, update, sceneStore, toolStore);
    this.moveBlockToSlot = new MoveBlockToSlot(blockStore, sceneStore);
    this.selector = new Selector(blockStore, scene, sceneStore, update);
    this.toolStore = toolStore;
  }

  onPointerDown(info: ToolInfo) {
    this.selector.select(info.eventObject?.userData.modelId, info.clientX, info.clientY);
  }

  onPointerLeave(info: ToolInfo) {
    const block = this.store.getBlocks()[info.eventObject?.userData.modelId || ''];

    if (block) {
      this.update.getTransaction().updateBlock(block.id, { isHovered: false }).commit();
    }
  }

  onDrag(info: ToolInfo) {
    this.move.perform(info.drag, info.dragDelta);
  }

  onDragEnd() {
    const selectedBlockIds = this.store.getSelectedRootBlockIds();
    const blocks = this.store.getBlocks();

    const edit = this.update.getTransaction();

    const drag = this.toolStore.getSelectOptions().drag;

    selectedBlockIds.forEach((blockId) =>
      edit.updateBlock(blockId, { position: addVector(blocks[blockId].position, drag) }),
    );

    edit.commit();

    store.dispatch(updateSelectTool({ drag: [0, 0, 0] }));
  }

  scaleMesh(scale: number, block: Block) {
    const { selectedSettings } = this.store.getBlockSettings();
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
    const selectedBlockIds = this.store.getSelectedRootBlockIds();

    if (selectedBlockIds.length === 0) {
      return;
    }

    let block = this.store.getBlocks()[selectedBlockIds[0]];

    const index = VectorUtils.getAxisIndex(axis);
    const newRotation = [...block.rotation] as [number, number, number];
    newRotation[index] = toRadian(rotation);

    this.update
      .getTransaction()
      .updateBlock(block.id, {
        rotation: newRotation,
      })
      .commit();

    block = this.store.getBlocks()[selectedBlockIds[0]];
  }

  private move: MoveBlock;

  private selector: Selector;

  private toolStore: ToolStore;

  private moveBlockToSlot: MoveBlockToSlot;
}

export default SelectTool;
