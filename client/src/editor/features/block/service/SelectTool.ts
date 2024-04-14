import { Store } from '../../../../common/utils/store';
import { setSelectedMeshes, updateMesh, updateMeshes } from '../../../services/scene/blocksSlice';
import Tool, { ToolInfo } from '../../../services/tool/service/Tool';
import ToolName from '../../../services/tool/state/ToolName';
import { getSelectedMeshes } from '@/editor/utils/storeUtils';
import VectorUtils, { addVector, snapTo } from '@/editor/utils/vectorUtils';
import { toRadian } from '@/editor/utils/mathUtils';
import { getBlock } from '../utils/blockUtils';
import Num3 from '@/editor/types/Num3';
import Block from '@/editor/types/Block';
import MatrixUtils from '@/editor/utils/MatrixUtils';
import SelectParent from './SelectParent';
import SceneService from '@/editor/services/scene/SceneService';

class SelectTool extends Tool {
  constructor(store: Store, scene: SceneService) {
    super(store, ToolName.Select, 'BiRectangle');
    this.scene = scene;
  }

  onPointerDown(info: ToolInfo) {
    const { blocks: meshes } = this.store.getState().blocks.present;
    const mesh = meshes[info.eventObjectName];

    if (mesh) {
      this.selectParent(info.eventObjectName);
    } else {
      this.store.dispatch(setSelectedMeshes([]));
    }
  }

  onDrag(info: ToolInfo) {
    if (info.draggedMesh) {
    }
  }

  onDragEnd(info: ToolInfo) {
    const { selectedBlockIds: selectedMeshIds } = this.store.getState().blocks.present;
    const { blocks: meshes } = this.store.getState().blocks.present;

    const finalMeshIds: string[] = [];

    selectedMeshIds.forEach((meshId) => {
      const mesh = meshes[meshId];

      if (mesh.children.length) {
        finalMeshIds.push(...mesh.children);
      } else {
        finalMeshIds.push(mesh.id);
      }
    });

    this.store.dispatch(
      updateMeshes(
        finalMeshIds.map((meshId) => {
          const mesh = meshes[meshId];

          return {
            id: mesh.id,
            position: addVector(mesh.position, info.drag),
          };
        }),
      ),
    );
  }

  selectParent(id: string) {
    const { blocks: meshes, selectedBlockIds: selectedMeshIds } = this.store.getState().blocks.present;

    const selectParent = new SelectParent([id, ...selectedMeshIds], meshes);
    const newSelectedMeshIds = selectParent.execute();

    this.store.dispatch(setSelectedMeshes(newSelectedMeshIds));
  }

  scaleMesh(scale: number, block: Block) {
    const { selectedSettings } = this.store.getState().blockSettings.present;
    const settings = selectedSettings[block.category];

    const index = VectorUtils.getAxisIndex('x');
    const newScale = [...block.scale] as Num3;
    newScale[index] = settings.scale[index] * scale;

    const newMesh = {
      ...block,
      scale: newScale,
    };

    this.store.dispatch(updateMesh(newMesh));
  }

  rotateMesh(axis: 'x' | 'y' | 'z', rotation: number) {
    const meshInfo = getSelectedMeshes(this.store)[0];
    const mesh = this.scene.getMesh(meshInfo.id);

    const index = VectorUtils.getAxisIndex(axis);
    const newRotation = [...meshInfo.rotation] as [number, number, number];
    newRotation[index] = toRadian(rotation);

    const rotatedMatrix = MatrixUtils.setRotation(mesh.matrixWorld, newRotation[index]);
    const vertices = MatrixUtils.getBoxWorldPositions(rotatedMatrix);
    const bottomLeft = vertices[0];

    const snappedX = snapTo(bottomLeft.x);
    const snappedZ = snapTo(bottomLeft.z);
    const deltaX = bottomLeft.x - snappedX;
    const deltaZ = bottomLeft.z - snappedZ;

    const position = meshInfo.position;

    const newMesh = {
      ...meshInfo,
      // position: [position[0] + deltaX, position[1], position[2] + deltaZ] as Num3,
      rotation: newRotation,
    };

    this.store.dispatch(updateMesh(newMesh));
  }

  private scene: SceneService;
}

export default SelectTool;
