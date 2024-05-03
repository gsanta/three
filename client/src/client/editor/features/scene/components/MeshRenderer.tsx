import useEditorContext from '@/app/editor/EditorContext';
import { useAppSelector } from '@/client/common/hooks/hooks';
import { Cone } from '@react-three/drei';
import CableMesh from '../../block/components/meshes/CableMesh';
import BoxMesh from '../../block/components/meshes/BoxMesh';
import WrappedMeshProps from '../../block/types/WrappedMeshProps';
import { ModelMesh } from '../../block/components/meshes/ModelMesh';
import Block from '@/client/editor/types/Block';
import { BlockCategoryRecords } from '@/client/editor/types/BlockCategory';

const renderComponent = (
  meshRendererProps: Omit<WrappedMeshProps, 'parent'>,
  blocks: Record<string, Block>,
  categories: BlockCategoryRecords,
): JSX.Element => {
  const { meshInfo: block, meshProps, materialProps, partMaterialProps } = meshRendererProps;

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
      return (
        <ModelMesh
          meshInfo={block}
          meshProps={{ ...meshProps }}
          materialProps={materialProps}
          parent={parent}
          partMaterialProps={partMaterialProps}
        />
      );
    default:
      return <BoxMesh meshInfo={block} meshProps={{ ...meshProps }} materialProps={materialProps} parent={parent} />;
  }
};

const MeshRenderer = (props: Omit<WrappedMeshProps, 'parent'>) => {
  const { meshInfo: block, meshProps = {}, materialProps = {} } = props;
  const { tool } = useEditorContext();
  const { blocks, categories } = useAppSelector((selector) => selector.block.present);

  if (block.children.length) {
    return (
      <group key={block.id} name={block.name} userData={{ modelId: block.id }}>
        {block.name !== 'group' && renderComponent(props, blocks, categories)}
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
