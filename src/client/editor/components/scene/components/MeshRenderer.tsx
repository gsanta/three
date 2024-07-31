import { useAppSelector } from '@/client/common/hooks/hooks';
import CableMesh from '../../mesh/CableMesh';
import WrappedMeshProps from '../../../types/block/WrappedMeshProps';
import { ModelMesh } from '../../mesh/ModelMesh';
import Block from '@/client/editor/types/Block';
import Cable from '@/client/editor/types/block/Cable';
import MoveControl from './MoveControl';

const isModelMesh = (block: Block): block is Block<'model'> => block.geometry === 'model';

const isTubeMesh = (block: Block): block is Block<'tube'> => block.category === 'cables';

const MeshRenderer = (props: WrappedMeshProps) => {
  const { block, meshProps, materialProps = {} } = props;
  const decorations = useAppSelector((selector) => selector.block.present.decorations);

  const { additions } = props;

  if (isTubeMesh(block)) {
    return (
      <CableMesh
        additions={additions}
        cable={decorations.cables[block.id] as Cable}
        block={block}
        meshProps={{ ...meshProps }}
        materialProps={materialProps}
      />
    );
  }

  if (isModelMesh(block)) {
    return block.isSelected ? (
      <MoveControl>
        {({ drag }) => (
          <ModelMesh
            key={block.id}
            additions={{
              position: drag,
            }}
            block={block}
            meshProps={meshProps}
            materialProps={materialProps}
          />
        )}
      </MoveControl>
    ) : (
      <ModelMesh
        key={block.id}
        additions={additions}
        block={block}
        meshProps={meshProps}
        materialProps={materialProps}
      />
    );
  }

  return undefined;
};

export default MeshRenderer;
