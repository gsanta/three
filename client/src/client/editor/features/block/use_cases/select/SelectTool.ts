import Tool, { ToolInfo } from '../../../tool/service/Tool';
import ToolName from '../../../tool/state/ToolName';
import VectorUtils, { addVector, snapTo } from '@/client/editor/utils/vectorUtils';
import { toRadian } from '@/client/editor/utils/mathUtils';
import Num3 from '@/client/editor/types/Num3';
import Block from '@/client/editor/types/Block';
import MatrixUtils from '@/client/editor/utils/MatrixUtils';
import SceneStore from '@/client/editor/features/scene/SceneStore';
import MoveService from '../move/MoveService';
import UpdateService from '../../services/update/UpdateService';
import BlockStore from '../../BlockStore';

class SelectTool extends Tool {
  constructor(store: BlockStore, update: UpdateService, scene: SceneStore, move: MoveService) {
    super(store, update, ToolName.Select, 'BiRectangle');

    this.scene = scene;
    this.move = move;
  }

  onPointerDown(info: ToolInfo) {
    const block = this.store.getBlocks()[info.eventObjectName];

    if (block) {
      this.selectParent(info.eventObjectName);
    } else {
      this.update.getUpdate().select(null).commit();
    }
  }

  onDrag() {
    const blocks = this.store.getBlocks();
    const selectedBlockIds = this.store.getSelectedBlockIds();

    selectedBlockIds.forEach((blockId) => {
      const block = blocks[blockId];

      this.move.move(block);
    });
  }

  onDragEnd(info: ToolInfo) {
    const selectedBlockIds = this.store.getSelectedBlockIds();
    const blocks = this.store.getBlocks();

    const finalBlockIds: string[] = [];

    selectedBlockIds.forEach((blockId) => {
      const block = blocks[blockId];

      if (block.children.length) {
        finalBlockIds.push(...block.children);
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

  selectParent(id: string) {
    const block = this.store.getBlocks()[id];

    const selectedBlockId = block.parent ? block.parent : block.id;

    this.update.getUpdate().select(selectedBlockId).commit();
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
    const selectedBlockIds = this.store.getSelectedBlockIds();

    if (selectedBlockIds.length === 0) {
      return;
    }

    const block = this.store.getBlocks()[selectedBlockIds[0]];

    const mesh = this.scene.getMesh(block.id);

    const index = VectorUtils.getAxisIndex(axis);
    const newRotation = [...block.rotation] as [number, number, number];
    newRotation[index] = toRadian(rotation);

    const rotatedMatrix = MatrixUtils.setRotation(mesh.matrixWorld, newRotation[index]);
    const vertices = MatrixUtils.getBoxWorldPositions(rotatedMatrix);
    const bottomLeft = vertices[0];

    const snappedX = snapTo(bottomLeft.x);
    const snappedZ = snapTo(bottomLeft.z);
    const deltaX = bottomLeft.x - snappedX;
    const deltaZ = bottomLeft.z - snappedZ;

    const position = block.position;

    this.update
      .getUpdate()
      .updateBlock(block.id, {
        rotation: newRotation,
      })
      .commit();
  }

  private scene: SceneStore;

  private move: MoveService;
}

export default SelectTool;
