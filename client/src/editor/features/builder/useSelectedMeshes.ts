import { useAppSelector } from '@/common/hooks/hooks';

const useSelectedMeshes = () => {
  const { selectedMeshIds } = useAppSelector((store) => store.builder.present);
  const { meshes } = useAppSelector((store) => store.scene.present);

  return selectedMeshIds?.map((id) => meshes[id]) || [];
};

export default useSelectedMeshes;
