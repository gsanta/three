import { useAppSelector } from '@/common/hooks/hooks';

const useSelectedMesh = () => {
  const { selectedMeshId } = useAppSelector((store) => store.builder.present);
  const { meshes } = useAppSelector((store) => store.scene.present);

  return meshes.find((mesh) => mesh.id === selectedMeshId);
};

export default useSelectedMesh;
