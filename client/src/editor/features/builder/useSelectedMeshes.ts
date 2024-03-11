import { useAppSelector } from '@/common/hooks/hooks';

const useSelectedMeshes = () => {
  const { selectedMeshIds } = useAppSelector((store) => store.builder.present);
  const { meshes } = useAppSelector((store) => store.scene.present);

  return meshes.filter((mesh) => selectedMeshIds?.includes(mesh.id));
};

export default useSelectedMeshes;
