import { useAppSelector } from '@/common/hooks/hooks';

const useSelectedMeshes = () => {
  const { selectedBlockIds: selectedMeshIds } = useAppSelector((store) => store.blocks.present);
  const { blocks: meshes } = useAppSelector((store) => store.blocks.present);

  return selectedMeshIds?.map((id) => meshes[id]) || [];
};

export default useSelectedMeshes;
