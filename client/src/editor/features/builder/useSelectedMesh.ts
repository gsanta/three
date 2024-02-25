import { useAppSelector } from '@/common/hooks/hooks';

const useSelectedMesh = () => {
  const { selectedMeshId } = useAppSelector((store) => store.builder);
  const { meshes } = useAppSelector((store) => store.scene);

  return meshes.find((mesh) => mesh.id === selectedMeshId);
};

export default useSelectedMesh;
