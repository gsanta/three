import { Store } from '@/client/common/utils/store';
import BlockData from '../data/BlockData';

export const getSelectedMeshes = (store: Store): BlockData[] => {
  const { blocks: meshes } = store.getState().block.present;
  const { selectedRootBlockIds: selectedMeshIds } = store.getState().block.present;

  return selectedMeshIds?.map((id) => meshes[id]) || [];
};
