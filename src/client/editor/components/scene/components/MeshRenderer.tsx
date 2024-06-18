import { useAppSelector } from '@/client/common/hooks/hooks';
import CableMesh from '../../mesh/CableMesh';
import BoxMesh from '../../mesh/BoxMesh';
import WrappedMeshProps from '../../../types/block/WrappedMeshProps';
import { ModelMesh } from '../../mesh/ModelMesh';
import Block from '@/client/editor/types/Block';
import { addVector } from '@/client/editor/utils/vectorUtils';

const isModelMesh = (block: Block): block is Block<'model'> => block.geometry === 'model';

const isTubeMesh = (block: Block): block is Block<'tube'> => block.category === 'cables';

const isBoxMesh = (block: Block): block is Block<'box'> => block.geometry === 'box';

const MeshRenderer = (props: Omit<WrappedMeshProps, 'parent'>) => {
  const { block, meshProps, materialProps, selectedParts } = props;
  const { blocks, decorations: categories } = useAppSelector((selector) => selector.block.present);

  const parent = block.parent ? blocks[block.parent] : undefined;

  const { position, rotation, ...restMeshProps } = meshProps || {};
  const { additions, ...restProps } = props;

  if (isTubeMesh(block)) {
    return (
      <CableMesh
        additions={additions}
        cable={categories.cables[block.id]}
        block={block}
        meshProps={{ ...meshProps }}
        materialProps={materialProps}
        parent={parent}
        selectedParts={selectedParts}
      />
    );
  }

  if (isModelMesh(block)) {
    return block.children?.length ? (
      <group
        key={block.id}
        position={addVector(additions?.position || [0, 0, 0], block.position)}
        rotation={block.rotation}
      >
        <ModelMesh
          // additions={additions}
          block={block}
          meshProps={{ ...restMeshProps }}
          materialProps={materialProps}
          overwrites={{ rotation: [0, 0, 0], position: [0, 0, 0] }}
          parent={parent}
          selectedParts={selectedParts}
        />
        {block.children.map((child) => (
          <MeshRenderer key={blocks[child].id} {...restProps} block={blocks[child]} />
        ))}
      </group>
    ) : (
      <ModelMesh
        additions={additions}
        block={block}
        meshProps={{ ...meshProps }}
        materialProps={materialProps}
        parent={parent}
        selectedParts={selectedParts}
      />
    );
  }

  if (isBoxMesh(block)) {
    return (
      <BoxMesh
        additions={additions}
        block={block}
        meshProps={{ ...meshProps }}
        materialProps={materialProps}
        parent={parent}
        selectedParts={selectedParts}
      />
    );
  }

  return undefined;
};

export default MeshRenderer;
