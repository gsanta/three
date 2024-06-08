import { useGLTF } from '@react-three/drei';
import useRegisterScene from '../hooks/useRegisterScene';
import { GroupProps } from '@react-three/fiber';
import { addVector } from '@/client/editor/utils/vectorUtils';
import { NodesType } from '../hooks/useGeometry';
import ModelMeshProps from '../types/ModelMeshProps';
import ModelGroupMesh from './ModelGroupMesh';
import ModelPartMesh from './ModelPartMesh';

export const ModelMesh = ({ additions, block, meshProps, overwrites, selectedParts = [] }: ModelMeshProps) => {
  const ref = useRegisterScene();
  const blockPosition = overwrites?.position ? overwrites.position : block.position;
  const position = additions?.position ? addVector(additions.position, blockPosition) : blockPosition;
  const blockRotation = overwrites?.rotation ? overwrites.rotation : block.rotation;

  const { nodes, materials } = useGLTF(block.path);

  const geometryNodes = nodes as unknown as NodesType;

  return (
    <group
      rotation={blockRotation}
      scale={block.scale}
      {...(meshProps as GroupProps)}
      position={position}
      ref={ref}
      userData={{ modelId: block.id }}
    >
      {block.parts.map((childPart) =>
        childPart.parts ? (
          <ModelGroupMesh
            block={block}
            key={childPart.name}
            materials={materials}
            nodes={geometryNodes}
            part={childPart}
            selectedParts={selectedParts}
          />
        ) : (
          <ModelPartMesh
            block={block}
            key={childPart.name}
            materials={materials}
            nodes={geometryNodes}
            onPointerEnter={meshProps?.onPointerEnter}
            part={childPart}
            selectedParts={selectedParts}
          />
        ),
      )}
    </group>
  );
};
