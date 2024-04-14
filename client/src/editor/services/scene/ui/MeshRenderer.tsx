import useEditorContext from '@/app/editor/EditorContext';
import { useAppSelector } from '@/common/hooks/hooks';
import { Cone } from '@react-three/drei';
import CableMesh from './CableMesh';
import BoxMesh from './BoxMesh';
import WrappedMeshProps from '../types/WrappedMeshProps';
import { ShapeType } from '@/editor/types/BlockType';
import { ModelMesh } from './ModelMesh';

const getComponent = (shape: ShapeType): (({ meshProps, meshInfo }: WrappedMeshProps) => React.JSX.Element | null) => {
  switch (shape) {
    case 'tube':
      return CableMesh as ({ meshProps, meshInfo }: WrappedMeshProps) => React.JSX.Element | null;
    case 'model':
      return ModelMesh as ({ meshProps, meshInfo }: WrappedMeshProps) => React.JSX.Element | null;
    default:
      return BoxMesh;
  }
};

const MeshRenderer = ({ meshInfo, meshProps = {}, materialProps = {} }: Omit<WrappedMeshProps, 'parent'>) => {
  const { tool } = useEditorContext();
  const { blocks: meshes } = useAppSelector((selector) => selector.blocks.present);

  if (meshInfo.name === 'group') {
    return (
      <group key={meshInfo.id} position={meshProps.position} name={meshInfo.name} userData={{ modelId: meshInfo.id }}>
        {meshInfo.children.map((child) => (
          <MeshRenderer
            key={meshes[child].id}
            meshInfo={meshes[child]}
            materialProps={materialProps}
            meshProps={{ onPointerDown: meshProps.onPointerDown }}
          />
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

  const Component = getComponent(meshInfo.geometry);

  const parent = meshInfo.parent ? meshes[meshInfo.parent] : undefined;

  return <Component meshInfo={meshInfo} meshProps={{ ...meshProps }} materialProps={materialProps} parent={parent} />;
};

export default MeshRenderer;
