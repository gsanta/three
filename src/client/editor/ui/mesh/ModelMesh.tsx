import { useGLTF } from '@react-three/drei';
import useRegisterScene from '../hooks/useRegisterScene';
import { GroupProps } from '@react-three/fiber';
import { NodesType } from '../hooks/useGeometry';
import ModelMeshProps from '../types/ModelMeshProps';
import ModelGroupMesh from './ModelGroupMesh';
import ModelPartMesh from './ModelPartMesh';
import { Box3, Group, Mesh, Vector3 } from 'three';
import ChildMeshRenderer from '../scene/components/ChildMeshRenderer';
import { useEffect, useState } from 'react';
import { ColliderBox } from '../scene/components/ColliderBox';
import Num3 from '../../models/math/Num3';
import Vector from '../../models/math/Vector';

export const ModelMesh = ({ additions, block, materialProps, meshProps, overwrites }: ModelMeshProps) => {
  const ref = useRegisterScene<Group>();
  const blockPosition = overwrites?.position ? overwrites.position : block.position;
  const blockRotation = overwrites?.rotation ? overwrites.rotation : block.rotation;

  const { nodes, materials } = useGLTF(block.path);

  const position = additions?.position
    ? new Vector(additions.position).add(new Vector(blockPosition)).get()
    : blockPosition;

  const geometryNodes = nodes as unknown as NodesType;

  const [boundingBoxScale, setBoundingBoxScale] = useState<Num3>();
  const [boundingBoxCenter, setBoundingBoxCenter] = useState<Num3>();

  useEffect(() => {
    if (!block.parentConnection && ref.current?.children[0].name === 'root') {
      const mesh = ref.current?.children[0] as Mesh;
      const box = new Box3();

      // ensure the bounding box is computed for its geometry
      // this should be done only once (assuming static geometries)
      mesh.geometry.computeBoundingBox();

      box.copy(mesh.geometry.boundingBox!).applyMatrix4(mesh.matrixWorld);

      setBoundingBoxScale(box.max.sub(box.min).toArray());

      const center = new Vector3();
      box.getCenter(center);

      box.max.sub(box.min);

      setBoundingBoxCenter([box.max.x - (box.max.x - box.min.x) / 2.0, 0, box.max.z - (box.max.z - box.min.z) / 2.0]);
      // setBoundingBoxCenter([0, 0, 0]);
    }
  }, [block.parentConnection, ref]);

  const component = (
    // <Select enabled={block.isHovered || block.isSelected}>
    <group
      rotation={[0, 0, 0]}
      scale={block.scale}
      {...(meshProps as GroupProps)}
      position={[0, 0, 0]}
      ref={ref}
      userData={{ modelId: block.id }}
      dispose={null}
    >
      {boundingBoxScale && boundingBoxCenter && (
        <ColliderBox position={block.position} scale={[boundingBoxScale[0], 10, boundingBoxScale[2]]} />
      )}
      {block.parts.map((part) =>
        part.parts ? (
          <ModelGroupMesh
            block={block}
            key={`${block.id}-${part.name}`}
            materials={materials}
            materialProps={materialProps}
            nodes={geometryNodes}
            part={part}
          />
        ) : (
          <ModelPartMesh
            block={block}
            key={`${block.id}-${part.name}`}
            materialProps={materialProps}
            materials={materials}
            nodes={geometryNodes}
            onPointerEnter={meshProps?.onPointerEnter}
            part={part}
          />
        ),
      )}
    </group>
    // </Select>
  );

  return (
    <group position={position} rotation={blockRotation}>
      {/* <ModelMesh
        // additions={additions}
        block={block}
        meshProps={{ ...restMeshProps }}
        materialProps={materialProps}
        overwrites={{ rotation: [0, 0, 0], position: [0, 0, 0] }}
      /> */}

      {block.isVisible && component}
      {block.childConnections.map(({ childBlock }) => (
        <ChildMeshRenderer
          key={childBlock}
          blockId={childBlock}
          // additions={additions}
          meshProps={{ ...meshProps }}
          materialProps={materialProps}
        />
      ))}
    </group>
  );
  // ) : (
  //   component
  // );
};
