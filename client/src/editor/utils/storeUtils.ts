import { Store } from '@/common/utils/store';

export const getSelectedMesh = (store: Store) => {
  const { meshes } = store.getState().scene;
  const { selectedMeshId } = store.getState().builder;

  return meshes.find((currentMesh) => currentMesh.id === selectedMeshId);
};
