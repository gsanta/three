import { useAppSelector } from '@/client/common/hooks/hooks';

const useSelectedBlocks = () => {
  const { selectedBlockIds: selectedMeshIds } = useAppSelector((store) => store.block.present);
  const { blocks: meshes } = useAppSelector((store) => store.block.present);

  return selectedMeshIds?.map((id) => meshes[id]) || [];
};

export default useSelectedBlocks;
