import useEditorContext from '@/app/editor/EditorContext';
import { useAppSelector } from '@/common/hooks/hooks';
import { Cone } from '@react-three/drei';
import CableMesh from './CableMesh';
import BoxMesh from './BoxMesh';
import WrappedMeshProps from '../types/WrappedMeshProps';
import { ModelMesh } from './ModelMesh';
import Block from '@/editor/types/Block';
import { BlockCategoryRecords } from '@/editor/types/BlockCategory';

const renderComponent = (
  meshRendererProps: Omit<WrappedMeshProps, 'parent'>,
  blocks: Record<string, Block>,
  categories: BlockCategoryRecords,
): JSX.Element => {
  const { meshInfo: block, meshProps, materialProps } = meshRendererProps;

  const parent = block.parent ? blocks[block.parent] : undefined;

  switch (block.geometry) {
    case 'tube':
      return (
        <CableMesh
          cable={categories.cables[block.id]}
          meshInfo={block}
          meshProps={{ ...meshProps }}
          materialProps={materialProps}
          parent={parent}
        />
      );
    case 'model':
      return <ModelMesh meshInfo={block} meshProps={{ ...meshProps }} materialProps={materialProps} parent={parent} />;
    default:
      return <BoxMesh meshInfo={block} meshProps={{ ...meshProps }} materialProps={materialProps} parent={parent} />;
  }
};

const MeshRenderer = (props: Omit<WrappedMeshProps, 'parent'>) => {
  const { meshInfo: block, meshProps = {}, materialProps = {} } = props;
  const { tool } = useEditorContext();
  const { blocks, categories } = useAppSelector((selector) => selector.blocks.present);

  if (block.name === 'group') {
    return (
      <group key={block.id} position={meshProps.position} name={block.name} userData={{ modelId: block.id }}>
        {block.children.map((child) => (
          <MeshRenderer
            key={blocks[child].id}
            meshInfo={blocks[child]}
            materialProps={materialProps}
            meshProps={{ onPointerDown: meshProps.onPointerDown }}
          />
        ))}
      </group>
    );
  }

  if (block.name === 'roof') {
    return (
      <Cone
        onPointerDown={(e) => {
          tool.onPointerDown(e);
          e.stopPropagation();
        }}
        position={block.position}
        rotation={block.rotation}
        {...meshProps}
        args={[block.radius, block.height, block.radialSegments]}
        key={block.id}
        name={block.name}
        userData={{ modelId: block.id }}
      >
        <meshStandardMaterial color="lightblue" {...materialProps} />
      </Cone>
    );
  }

  return renderComponent(props, blocks, categories);
};

export default MeshRenderer;
