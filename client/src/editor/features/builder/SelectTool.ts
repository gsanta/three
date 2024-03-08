import { Store } from '../../../common/utils/store';
import { addMeshPosition, updateMesh } from '../scene/sceneSlice';
import Tool, { PointerInfo } from '../tool/state/Tool';
import ToolName from '../tool/state/ToolName';
import { setSelectedMesh } from './builderSlice';
import { getSelectedMesh } from '@/editor/utils/storeUtils';
import { getAxisIndex } from '@/editor/utils/vectorUtils';
import { toRadian } from '@/editor/utils/mathUtils';
import { getBlock } from './utils/blockUtils';
import Num3 from '@/editor/types/Num3';
import MeshInfo from '@/editor/types/MeshInfo';

class SelectTool extends Tool {
  constructor(store: Store) {
    super(store, ToolName.Select, 'BiRectangle');
  }

  onPointerDown(info: PointerInfo) {
    const { meshes } = this.store.getState().scene.present;
    const mesh = meshes.find((currentMesh) => currentMesh.id === info.eventObjectName);

    this.store.dispatch(setSelectedMesh(mesh));
  }

  onDragEnd(info: PointerInfo) {
    const selectedMesh = getSelectedMesh(this.store);

    if (!selectedMesh) {
      return;
    }

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

  rotateMesh(direction: 'x' | 'y' | 'z', rotation: number, mesh: MeshInfo) {
    const newRotation = [...mesh.rotation] as [number, number, number];

    let index = 0;
    if (direction === 'y') {
      index = 1;
    } else if (direction === 'z') {
      index = 2;
    }

    newRotation[index] = toRadian(rotation);

    const newMesh = {
      ...mesh,
      rotation: newRotation,
    };

    this.store.dispatch(updateMesh(newMesh));
  }
}

export default SelectTool;
