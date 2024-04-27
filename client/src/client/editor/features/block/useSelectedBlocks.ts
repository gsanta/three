import { useAppSelector } from '@/client/common/hooks/hooks';

const useSelectedBlocks = () => {
  const { selectedBlockIds: selectedMeshIds } = useAppSelector((store) => store.blocks.present);
  const { blocks: meshes } = useAppSelector((store) => store.blocks.present);

  return selectedMeshIds?.map((id) => meshes[id]) || [];
};

export default useSelectedBlocks;
