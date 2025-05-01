import { Store } from '@/client/common/utils/store';
import BlockType from '../types/BlockType';

export const getSelectedMeshes = (store: Store): BlockType[] => {
  const { blocks: meshes } = store.getState().block.present;
  const { selectedRootBlockIds: selectedMeshIds } = store.getState().block.present;

  return selectedMeshIds?.map((id) => meshes[id]) || [];
};
