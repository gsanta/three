import { Store } from '@/common/utils/store';
import Block from '../types/Block';

export const getSelectedMeshes = (store: Store): Block[] => {
  const { blocks: meshes } = store.getState().blocks.present;
  const { selectedBlockIds: selectedMeshIds } = store.getState().blocks.present;

  return selectedMeshIds?.map((id) => meshes[id]) || [];
};
