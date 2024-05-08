import { addVector } from '@/client/editor/utils/vectorUtils';
import WrappedMeshProps from '../../types/WrappedMeshProps';
import { Color } from 'three';
import useRegisterScene from '../hooks/useRegisterScene';

const BoxMesh = ({ block: meshInfo, meshProps, materialProps, parent }: WrappedMeshProps) => {
  const ref = useRegisterScene();

  return (
    <mesh
      onPointerDown={meshProps?.onPointerDown}
      castShadow
      position={addVector(meshInfo.position, parent?.position || [0, 0, 0])}
      rotation={meshInfo.rotation}
      scale={meshInfo.scale}
      {...meshProps}
      key={meshInfo.id}
      name={meshInfo.name}
      ref={ref}
      userData={{ modelId: meshInfo.id }}
    >
      <boxGeometry key="geometry" />
      <meshStandardMaterial
        key="material"
        color={new Color(...(meshInfo.color || [0.5, 0.2, 0.5]))}
        {...materialProps}
      />
    </mesh>
  );
};

export default BoxMesh;
