import { Vector3 } from 'three';
import { Store } from '../../../common/utils/store';
import { MeshInfo, addMeshPosition, updateMesh } from '../scene/sceneSlice';
import Tool, { PointerInfo } from '../tool/state/Tool';
import ToolName from '../tool/state/ToolName';
import { setSelectedMesh } from './builderSlice';

class SelectTool extends Tool {
  constructor(store: Store) {
    super(store, ToolName.Select, 'BiRectangle');
  }

  onPointerDown(info: PointerInfo) {
    const { meshes } = this.store.getState().scene;
    const { selectedMeshId } = this.store.getState().builder;

    const mesh = meshes.find((currentMesh) => currentMesh.id === info.eventObjectName);
    const prevSelectedMesh = meshes.find((currentMesh) => currentMesh.id === selectedMeshId);

    if (prevSelectedMesh) {
      this.store.dispatch(
        addMeshPosition({
          meshId: prevSelectedMesh.id,
          position: [info.dragPos.x, info.dragPos.y, info.dragPos.z],
        }),
      );
      info.dragPos = new Vector3();
    }

    this.store.dispatch(setSelectedMesh(mesh));
  }

  scaleMesh(scale: [number, number, number], mesh?: MeshInfo) {
    if (!mesh) {
      return;
    }

    const newMesh = {
      ...mesh,
      scale,
    };

    this.store.dispatch(updateMesh(newMesh));
  }

  rotateMesh(direction: 'x' | 'y' | 'z', rotation: number, mesh: MeshInfo) {
    const newRotation = [...mesh.rotation] as [number, number, number];

    let index = 0;
    if (direction === 'y') {
      index = 1;
    } else if (direction === 'z') {
      index = 2;
    }

    newRotation[index] = rotation;

    const newMesh = {
      ...mesh,
      rotation: newRotation,
    };

    this.store.dispatch(updateMesh(newMesh));
  }
}

export default SelectTool;
