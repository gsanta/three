import { Store } from '@/common/utils/store';
import MeshData from '../types/MeshData';

export const getSelectedMeshes = (store: Store): MeshData[] => {
  const { meshes } = store.getState().scene.present;
  const { selectedMeshIds } = store.getState().scene.present;

  return selectedMeshIds?.map((id) => meshes[id]) || [];
};
