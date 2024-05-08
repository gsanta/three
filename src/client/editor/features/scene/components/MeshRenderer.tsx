import { useAppSelector } from '@/client/common/hooks/hooks';
import CableMesh from '../../block/components/meshes/CableMesh';
import BoxMesh from '../../block/components/meshes/BoxMesh';
import WrappedMeshProps from '../../block/types/WrappedMeshProps';
import { ModelMesh } from '../../block/components/meshes/ModelMesh';
import Block from '@/client/editor/types/Block';

const isModelMesh = (block: Block): block is Block<'model'> => block.geometry === 'model';

const isTubeMesh = (block: Block): block is Block<'tube'> => block.geometry === 'tube';

const isBoxMesh = (block: Block): block is Block<'box'> => block.geometry === 'box';

const MeshRenderer = (props: Omit<WrappedMeshProps, 'parent'>) => {
  const { additions, block: block, meshProps, materialProps, selectedParts } = props;
  const { blocks, categories } = useAppSelector((selector) => selector.block.present);

  const parent = block.parent ? blocks[block.parent] : undefined;

  if (isModelMesh(block)) {
    return (
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
};

export default MeshRenderer;
