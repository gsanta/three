import { Store } from '@/common/utils/store';
import MeshInfo from '../types/MeshInfo';

export const getSelectedMeshes = (store: Store): MeshInfo[] => {
  const { meshes } = store.getState().scene.present;
  const { selectedMeshIds } = store.getState().builder.present;

  return meshes.filter((currentMesh) => selectedMeshIds?.includes(currentMesh.id));
};