import { Store } from '../../../common/utils/store';
import { addMeshPosition, updateMesh } from '../scene/sceneSlice';
import Tool, { ToolInfo } from '../tool/state/Tool';
import ToolName from '../tool/state/ToolName';
import { setSelectedMesh } from './builderSlice';
import { getSelectedMesh } from '@/editor/utils/storeUtils';
import { getAxisIndex, snapTo } from '@/editor/utils/vectorUtils';
import { toRadian } from '@/editor/utils/mathUtils';
import { getBlock } from './utils/blockUtils';
import Num3 from '@/editor/types/Num3';
import MeshInfo from '@/editor/types/MeshInfo';
import MatrixUtils from '@/editor/utils/MatrixUtils';

class SelectTool extends Tool {
  constructor(store: Store) {
    super(store, ToolName.Select, 'BiRectangle');
  }

  onPointerDown(info: ToolInfo) {
    const { meshes } = this.store.getState().scene.present;
    const mesh = meshes.find((currentMesh) => currentMesh.id === info.eventObjectName);

    this.store.dispatch(setSelectedMesh(mesh));
  }

  onDragEnd(info: ToolInfo) {
    const selectedMesh = getSelectedMesh(this.store);

    this.store.dispatch(
      addMeshPosition({
        meshId: selectedMesh.id,
        position: info.drag,
      }),
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

    const meshInfo = getSelectedMesh(this.store);

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
