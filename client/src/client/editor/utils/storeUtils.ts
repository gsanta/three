import { Store } from '@/client/common/utils/store';
import Block from '../types/Block';

export const getSelectedMeshes = (store: Store): Block[] => {
  const { blocks: meshes } = store.getState().block.present;
  const { selectedBlockIds: selectedMeshIds } = store.getState().block.present;

  return selectedMeshIds?.map((id) => meshes[id]) || [];
};
