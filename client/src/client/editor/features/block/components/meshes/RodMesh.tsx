import { useGLTF } from '@react-three/drei';
import WrappedMeshProps from '../../types/WrappedMeshProps';
import useRegisterScene from '../hooks/useRegisterScene';

export const RodMesh = ({ meshInfo, meshProps, materialProps, parent }: WrappedMeshProps) => {
  const ref = useRegisterScene();

  const { nodes, materials } = useGLTF('/untitled.glb');

  return (
    <mesh
      castShadow
      receiveShadow
      geometry={nodes.Cube.geometry}
      scale={[2, 0.5, 0.5]}
      userData={{ modelId: meshInfo.id }}
      position={meshInfo.position}
      {...meshProps}
      ref={ref}
    >
      <meshStandardMaterial {...materials.Material} color="red" {...materialProps} />
    </mesh>
  );
};

useGLTF.preload('/untitled.glb');
