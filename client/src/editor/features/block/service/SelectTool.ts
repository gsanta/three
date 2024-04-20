import { Store } from '../../../../common/utils/store';
import { setSelectedBlocks } from '../../../services/scene/blocksSlice';
import Tool, { ToolInfo } from '../../../services/tool/service/Tool';
import ToolName from '../../../services/tool/state/ToolName';
import { getSelectedMeshes } from '@/editor/utils/storeUtils';
import VectorUtils, { addVector, snapTo } from '@/editor/utils/vectorUtils';
import { toRadian } from '@/editor/utils/mathUtils';
import Num3 from '@/editor/types/Num3';
import Block from '@/editor/types/Block';
import MatrixUtils from '@/editor/utils/MatrixUtils';
import SelectParent from './SelectParent';
import SceneService from '@/editor/services/scene/SceneService';
import MoveService from './move/MoveService';
import UpdateService from './UpdateService';

class SelectTool extends Tool {
  constructor(store: Store, scene: SceneService, move: MoveService, update: UpdateService) {
    super(store, ToolName.Select, 'BiRectangle');

    this.scene = scene;
    this.update = update;
    this.move = move;
  }

  onPointerDown(info: ToolInfo) {
    const { blocks: meshes } = this.store.getState().blocks.present;
    const mesh = meshes[info.eventObjectName];

    if (mesh) {
      this.selectParent(info.eventObjectName);
    } else {
      this.store.dispatch(setSelectedBlocks([]));
    }
  }

  onDrag(info: ToolInfo) {
    const { selectedBlockIds, blocks } = this.store.getState().blocks.present;

    selectedBlockIds.forEach((blockId) => {
      const block = blocks[blockId];

      this.move.move(info.drag, block);
    });
  }

  onDragEnd(info: ToolInfo) {
    const { selectedBlockIds: selectedMeshIds } = this.store.getState().blocks.present;
    const { blocks } = this.store.getState().blocks.present;

    const finalBlockIds: string[] = [];

    selectedMeshIds.forEach((meshId) => {
      const mesh = blocks[meshId];

      if (mesh.children.length) {
        finalBlockIds.push(...mesh.children);
      } else {
        finalBlockIds.push(mesh.id);
      }
    });

    const updates = finalBlockIds.map((blockId) => {
      const block = blocks[blockId];

      return this.update.updateBlock(blockId, { position: addVector(block.position, info.drag) });
    });

    this.update.executeUpdate(updates.map((update) => ({ block: update, category: update.category })));
  }

  selectParent(id: string) {
    const { blocks: meshes, selectedBlockIds: selectedMeshIds } = this.store.getState().blocks.present;

    const selectParent = new SelectParent([id, ...selectedMeshIds], meshes);
    const newSelectedMeshIds = selectParent.execute();

    this.store.dispatch(setSelectedBlocks(newSelectedMeshIds));
  }

  scaleMesh(scale: number, block: Block) {
    const { selectedSettings } = this.store.getState().blockSettings.present;
    const settings = selectedSettings[block.category];

    const index = VectorUtils.getAxisIndex('x');
    const newScale = [...block.scale] as Num3;
    newScale[index] = settings.scale[index] * scale;

    const update = this.update.updateBlock(block.id, {
      scale: newScale,
    });

    this.update.executeUpdate([{ block: update, category: block.category }]);
  }

  rotateMesh(axis: 'x' | 'y' | 'z', rotation: number) {
    const block = getSelectedMeshes(this.store)[0];
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

    const update = this.update.updateBlock(block.id, {
      rotation: newRotation,
    });

    this.update.executeUpdate([{ block: update, category: block.category }]);
  }

  private scene: SceneService;

  private update: UpdateService;

  private move: MoveService;
}

export default SelectTool;
