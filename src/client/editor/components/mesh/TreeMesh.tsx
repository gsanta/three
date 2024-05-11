import { useGLTF } from '@react-three/drei';
import WrappedMeshProps from '../../types/block/WrappedMeshProps';
import useRegisterScene from '../hooks/useRegisterScene';
import { GroupProps } from '@react-three/fiber';

export const TreeMesh = ({ block: meshInfo, meshProps }: WrappedMeshProps) => {
  const ref = useRegisterScene();

  const { nodes, materials } = useGLTF('/tree.glb');

  return (
    <group
      position={meshInfo.position}
      scale={[0.572, 4.28, 0.572]}
      {...(meshProps as GroupProps)}
      ref={ref}
      userData={{ modelId: meshInfo.id }}
    >
      <mesh castShadow receiveShadow geometry={nodes.Cylinder_1.geometry} material={materials['Material.002']} />
      <mesh castShadow receiveShadow geometry={nodes.Cylinder_2.geometry} material={materials['Material.004']} />
      <mesh castShadow receiveShadow geometry={nodes.Cylinder_3.geometry} material={materials['Material.003']} />
      <mesh castShadow receiveShadow geometry={nodes.Cylinder_4.geometry} material={materials['Material.001']} />
    </group>
  );
};

useGLTF.preload('/tree.glb');
