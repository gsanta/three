import { useAppSelector } from '@/client/common/hooks/hooks';
import CableMesh from '../../mesh/CableMesh';
import BoxMesh from '../../mesh/BoxMesh';
import WrappedMeshProps from '../../../types/block/WrappedMeshProps';
import { ModelMesh } from '../../mesh/ModelMesh';
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
