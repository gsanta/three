import useEditorContext from '@/app/editor/EditorContext';
import { useAppSelector } from '@/common/hooks/hooks';
import { Cone } from '@react-three/drei';
import { ThreeEvent } from '@react-three/fiber';
import CableMesh from './CableMesh';
import BoxMesh from './BoxMesh';
import { useCallback } from 'react';
import WrappedMeshProps from '../types/WrappedMeshProps';

const MeshRenderer = ({ meshInfo, meshProps = {}, materialProps = {} }: Omit<WrappedMeshProps, 'parent'>) => {
  const { tool } = useEditorContext();
  const { meshes } = useAppSelector((selector) => selector.scene.present);

  const handlePointerDown = useCallback(
    (event: ThreeEvent<PointerEvent>) => {
      tool.onPointerDown(event);
      event.stopPropagation();
    },
    [tool],
  );

  if (meshInfo.name === 'group') {
    return (
      <group key={meshInfo.id} position={meshProps.position} name={meshInfo.name} userData={{ modelId: meshInfo.id }}>
        {meshInfo.children.map((child) => (
          <MeshRenderer key={meshes[child].id} meshInfo={meshes[child]} materialProps={materialProps} />
        ))}
      </group>
    );
  }

  if (meshInfo.name === 'roof') {
    return (
      <Cone
        onPointerDown={(e) => {
          tool.onPointerDown(e);
          e.stopPropagation();
        }}
        position={meshInfo.position}
        rotation={meshInfo.rotation}
        {...meshProps}
        args={[meshInfo.radius, meshInfo.height, meshInfo.radialSegments]}
        key={meshInfo.id}
        name={meshInfo.name}
        userData={{ modelId: meshInfo.id }}
      >
        <meshStandardMaterial color="lightblue" {...materialProps} />
      </Cone>
    );
  }

  if (meshInfo.name === 'cable') {
    return (
      <CableMesh
        meshInfo={meshInfo}
        meshProps={{ ...meshProps, onPointerDown: handlePointerDown }}
        points={meshInfo.points}
      />
    );
  }

  const parent = meshInfo.parent ? meshes[meshInfo.parent] : undefined;

  return (
    <BoxMesh
      meshInfo={meshInfo}
      meshProps={{ ...meshProps, onPointerDown: handlePointerDown }}
      materialProps={materialProps}
      parent={parent}
    />
  );
};

export default MeshRenderer;
