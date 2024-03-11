import { Store } from '../../../common/utils/store';
import { updateMesh, updateMeshes } from '../scene/sceneSlice';
import Tool, { ToolInfo } from '../tool/state/Tool';
import ToolName from '../tool/state/ToolName';
import { getSelectedMeshes } from '@/editor/utils/storeUtils';
import { addVector, getAxisIndex, snapTo } from '@/editor/utils/vectorUtils';
import { toRadian } from '@/editor/utils/mathUtils';
import { getBlock } from './utils/blockUtils';
import Num3 from '@/editor/types/Num3';
import MeshInfo from '@/editor/types/MeshInfo';
import MatrixUtils from '@/editor/utils/MatrixUtils';
import { setSelectedMeshes } from './builderSlice';

class SelectTool extends Tool {
  constructor(store: Store) {
    super(store, ToolName.Select, 'BiRectangle');
  }

  onPointerDown(info: ToolInfo) {
    const { meshes } = this.store.getState().scene.present;
    const { selectedMeshIds } = this.store.getState().builder.present;
    const mesh = meshes.find((currentMesh) => currentMesh.id === info.eventObjectName);
    const prevSelectedMeshes = meshes.filter((currentMesh) => selectedMeshIds?.includes(currentMesh.id));

    if (mesh) {
      this.store.dispatch(setSelectedMeshes([...prevSelectedMeshes, mesh]));
    } else {
      this.store.dispatch(setSelectedMeshes([]));
    }
  }

  onDragEnd(info: ToolInfo) {
    const selectedMeshes = getSelectedMeshes(this.store);

    this.store.dispatch(
      updateMeshes(
        selectedMeshes.map((mesh) => ({
          id: mesh.id,
          position: addVector(mesh.position, info.drag),
        })),
      ),
    );
  }

  scaleMesh(scale: number, mesh: MeshInfo) {
    const block = getBlock(this.store.getState().builder.present.blocks, mesh.name);

    const index = getAxisIndex(block.options.size.direction);
    const newScale = [...mesh.scale] as Num3;
    newScale[index] = block.data.scale[index] * scale;

    const newMesh = {
      ...mesh,
      scale: newScale,
    };

    this.store.dispatch(updateMesh(newMesh));
  }

  rotateMesh(axis: 'x' | 'y' | 'z', rotation: number, info: ToolInfo) {
    const { selectedMesh } = info;

    if (!selectedMesh) {
      return;
    }

    const meshInfo = getSelectedMeshes(this.store)[0];

    const index = getAxisIndex(axis);
    const newRotation = [...meshInfo.rotation] as [number, number, number];
    newRotation[index] = toRadian(rotation);

    const rotatedMatrix = MatrixUtils.setRotation(selectedMesh.matrixWorld, newRotation[index]);
    const vertices = MatrixUtils.getBoxWorldPositions(rotatedMatrix);
    const bottomLeft = vertices[0];

    const snappedX = snapTo(bottomLeft.x);
    const snappedZ = snapTo(bottomLeft.z);
    const deltaX = bottomLeft.x - snappedX;
    const deltaZ = bottomLeft.z - snappedZ;

    const position = meshInfo.position;

    const newMesh = {
      ...meshInfo,
      position: [position[0] + deltaX, position[1], position[2] + deltaZ] as Num3,
      rotation: newRotation,
    };

    this.store.dispatch(updateMesh(newMesh));
  }
}

export default SelectTool;
