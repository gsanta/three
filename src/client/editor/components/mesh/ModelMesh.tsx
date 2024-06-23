import { useAnimations, useGLTF } from '@react-three/drei';
import useRegisterScene from '../hooks/useRegisterScene';
import { GroupProps } from '@react-three/fiber';
import { addVector } from '@/client/editor/utils/vectorUtils';
import { NodesType } from '../hooks/useGeometry';
import ModelMeshProps from '../types/ModelMeshProps';
import ModelGroupMesh from './ModelGroupMesh';
import ModelPartMesh from './ModelPartMesh';
import useDevice from '../hooks/useDevice';
import { Group } from 'three';

export const ModelMesh = ({ additions, block, materialProps, meshProps, overwrites }: ModelMeshProps) => {
  const ref = useRegisterScene<Group>();
  const blockPosition = overwrites?.position ? overwrites.position : block.position;
  const position = additions?.position ? addVector(additions.position, blockPosition) : blockPosition;
  const blockRotation = overwrites?.rotation ? overwrites.rotation : block.rotation;

  const { animations, nodes, materials } = useGLTF(block.path);
  const { actions, mixer } = useAnimations(animations, ref);

  useDevice({ block, actions, mixer });

  const geometryNodes = nodes as unknown as NodesType;

  return (
    <group
      rotation={blockRotation}
      scale={block.scale}
      {...(meshProps as GroupProps)}
      position={position}
      ref={ref}
      userData={{ modelId: block.id }}
      dispose={null}
    >
      {block.parts.map((part) =>
        part.parts ? (
          <ModelGroupMesh
            block={block}
            key={`${block.id}-${part.index}`}
            materials={materials}
            nodes={geometryNodes}
            part={part}
          />
        ) : (
          <ModelPartMesh
            block={block}
            key={`${block.id}-${part.index}`}
            materialProps={materialProps}
            materials={materials}
            nodes={geometryNodes}
            onPointerEnter={meshProps?.onPointerEnter}
            part={part}
          />
        ),
      )}
    </group>
  );
};
