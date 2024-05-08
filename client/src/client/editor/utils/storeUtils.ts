import { Store } from '@/client/common/utils/store';
import Block from '../types/Block';

export const getSelectedMeshes = (store: Store): Block[] => {
  const { blocks: meshes } = store.getState().block.present;
  const { selectedRootBlockIds: selectedMeshIds } = store.getState().block.present;

  return selectedMeshIds?.map((id) => meshes[id]) || [];
};
