import { Store } from '@/common/utils/store';
import MeshInfo from '../types/MeshInfo';

export const getSelectedMesh = (store: Store): MeshInfo => {
  const { meshes } = store.getState().scene.present;
  const { selectedMeshId } = store.getState().builder.present;

  const meshInfo = meshes.find((currentMesh) => currentMesh.id === selectedMeshId);

  if (!meshInfo) {
    throw new Error('Selected mesh not found');
  }

  return meshInfo;
};
