import Tool, { ToolInfo } from '../../../tool/service/Tool';
import ToolName from '../../../tool/state/ToolName';
import VectorUtils, { addVector } from '@/client/editor/utils/vectorUtils';
import { toRadian } from '@/client/editor/utils/mathUtils';
import Num3 from '@/client/editor/types/Num3';
import Block from '@/client/editor/types/Block';
import SceneStore from '@/client/editor/features/scene/SceneStore';
import MoveService from '../move/MoveService';
import UpdateService from '../../services/update/UpdateService';
import BlockStore from '../../BlockStore';
import { store } from '@/client/common/utils/store';
import { updateSelectTool } from '../../../tool/toolSlice';
import SceneService from '../../../scene/SceneService';

class SelectTool extends Tool {
  constructor(
    blockStore: BlockStore,
    move: MoveService,
    scene: SceneService,
    sceneStore: SceneStore,
    update: UpdateService,
  ) {
    super(blockStore, update, ToolName.Select, 'BiRectangle');

    this.scene = scene;
    this.sceneStore = sceneStore;
    this.move = move;
  }

  onPointerDown(info: ToolInfo) {
    const block = this.store.getBlocks()[info.eventObjectName];

    if (block) {
      this.selectRoot(info.eventObjectName, info.clientX, info.clientY);
    } else {
      this.update.getUpdate().select(null).commit();
    }
  }

  onDrag(info: ToolInfo) {
    const blocks = this.store.getBlocks();
    const selectedBlockIds = this.store.getSelectedRootBlockIds();

    store.dispatch(updateSelectTool({ drag: info.drag }));

    selectedBlockIds.forEach((blockId) => {
      const block = blocks[blockId];

      this.move.move(block);
    });
  }

  onDragEnd(info: ToolInfo) {
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

    finalBlockIds.forEach((blockId) =>
      edit.updateBlock(blockId, { position: addVector(blocks[blockId].position, info.drag) }),
    );

    edit.commit();
  }

  selectRoot(id: string, clientX: number, clientY: number) {
    const mesh = this.sceneStore.getObj3d(id);

    if (!mesh) {
      return;
    }

    const [intersects] = this.scene.intersection(mesh, clientX, clientY);

    const partName = intersects
      ?.map((intersection) => intersection.object.name)
      .find((name) => name && name !== 'root');

    const block = this.store.getBlocks()[id];

    const update = this.update.getUpdate();

    update.select(block.id, partName);

    block.children.forEach((child) => update.select(child));

    update.commit();
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

  private sceneStore: SceneStore;

  private move: MoveService;

  private scene: SceneService;
}

export default SelectTool;
