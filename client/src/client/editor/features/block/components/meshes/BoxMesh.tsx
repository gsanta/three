import { addVector } from '@/client/editor/utils/vectorUtils';
import WrappedMeshProps from '../../types/WrappedMeshProps';
import useEditorContext from '@/app/editor/EditorContext';
import { useCallback, useEffect, useRef } from 'react';
import { Color, Mesh } from 'three';

const BoxMesh = ({ meshInfo, meshProps, materialProps, parent }: WrappedMeshProps) => {
  const { scene } = useEditorContext();

  // const meshRef = useRef<Mesh>(null);

  const ref = useCallback(
    (mesh: Mesh) => {
      if (mesh) {
        scene.addMesh(mesh);
      }
    },
    [scene],
  );

  useEffect(() => {
    const id = meshRef.current?.userData.modelId;
    scene.addMesh(meshRef.current);

    return () => {
      scene.removeMesh(ref);
    };
  }, [scene]);

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
