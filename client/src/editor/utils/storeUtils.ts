import { Store } from '@/common/utils/store';

export const getSelectedMesh = (store: Store) => {
  const { meshes } = store.getState().scene.present;
  const { selectedMeshId } = store.getState().builder.present;

  return meshes.find((currentMesh) => currentMesh.id === selectedMeshId);
};
