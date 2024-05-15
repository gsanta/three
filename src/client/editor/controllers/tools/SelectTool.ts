import Tool, { ToolInfo } from '../../types/Tool';
import ToolName from '../../types/ToolName';
import VectorUtils, { addVector } from '@/client/editor/utils/vectorUtils';
import { toRadian } from '@/client/editor/utils/mathUtils';
import Num3 from '@/client/editor/types/Num3';
import Block from '@/client/editor/types/Block';
import SceneStore from '@/client/editor/components/scene/SceneStore';
import MoveBlock from '../../use_cases/block/move/MoveBlock';
import UpdateService from '../../services/update/UpdateService';
import BlockStore from '../../stores/block/BlockStore';
import { store } from '@/client/common/utils/store';
import { updateSelectTool } from '../../stores/tool/toolSlice';
import SceneService from '../../components/scene/SceneService';
import Selector from '../../use_cases/block/SelectBlock';
import ToolStore from '../../stores/tool/ToolStore';
import { hover } from '../../stores/block/blockSlice';

class SelectTool extends Tool {
  constructor(
    blockStore: BlockStore,
    scene: SceneService,
    sceneStore: SceneStore,
    toolStore: ToolStore,
    update: UpdateService,
  ) {
    super(blockStore, update, ToolName.Select, 'BiRectangle');

    this.move = new MoveBlock(blockStore, update, sceneStore, toolStore);
    this.selector = new Selector(blockStore, scene, sceneStore);
    this.toolStore = toolStore;
  }

  onPointerDown(info: ToolInfo) {
    const block = this.store.getBlocks()[info.eventObjectName];

    if (block) {
      const edit = this.update.getUpdate();
      this.selector.select(edit, info.eventObjectName, info.clientX, info.clientY);
      edit.commit();
    } else {
      this.update.getUpdate().select(null).commit();
    }
  }

  onPointerEnter(info: ToolInfo) {
    const block = this.store.getBlocks()[info.eventObjectName];

    if (info.eventObjectName === 'plane') {
      store.dispatch(hover(null));
    } else if (block) {
      store.dispatch(hover(block.id));
    }
  }

  onPointerLeave(info: ToolInfo) {
    const block = this.store.getBlocks()[info.eventObjectName];

    if (block) {
      this.update.getUpdate().update(block.id, { isHovered: false }, {}).commit();
    }
  }

  onDrag(info: ToolInfo) {
    this.move.perform(info.drag, info.dragDelta);
  }

  onDragEnd() {
    const selectedBlockIds = this.store.getSelectedRootBlockIds();
    const blocks = this.store.getBlocks();

    const finalBlockIds: string[] = [];

    selectedBlockIds.forEach((blockId) => {
      const block = blocks[blockId];

      if (block.children.length) {
        finalBlockIds.push(...block.children);

        if (block.name !== 'group') {
          finalBlockIds.push(block.id);
        }
      } else {
        finalBlockIds.push(block.id);
      }
    });

    const edit = this.update.getUpdate();

    const drag = this.toolStore.getSelectOptions().drag;

    finalBlockIds.forEach((blockId) =>
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
      .getUpdate()
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

    const block = this.store.getBlocks()[selectedBlockIds[0]];

    const index = VectorUtils.getAxisIndex(axis);
    const newRotation = [...block.rotation] as [number, number, number];
    newRotation[index] = toRadian(rotation);

    this.update
      .getUpdate()
      .updateBlock(block.id, {
        rotation: newRotation,
      })
      .commit();
  }

  private move: MoveBlock;

  private selector: Selector;

  private toolStore: ToolStore;
}

export default SelectTool;
