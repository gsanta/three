import { useAppSelector } from '@/client/common/hooks/hooks';
import CableMesh from '../../mesh/CableMesh';
import WrappedMeshProps from '../../../types/block/WrappedMeshProps';
import { ModelMesh } from '../../mesh/ModelMesh';
import Block from '@/client/editor/types/Block';
import { addVector } from '@/client/editor/utils/vectorUtils';
import Cable from '@/client/editor/types/block/Cable';
import ChildMeshRenderer from './ChildMeshRenderer';

const isModelMesh = (block: Block): block is Block<'model'> => block.geometry === 'model';

const isTubeMesh = (block: Block): block is Block<'tube'> => block.category === 'cables';

const MeshRenderer = (props: WrappedMeshProps) => {
  const { block, meshProps, materialProps } = props;
  const decorations = useAppSelector((selector) => selector.block.present.decorations);

  // const parent = block.parent ? blocks[block.parent] : undefined;

  const { position, rotation, ...restMeshProps } = meshProps || {};
  const { additions, ...restProps } = props;

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
        />
        {block.children.map((child) => (
          <ChildMeshRenderer {...restProps} key={child} blockId={child} />
        ))}
      </group>
    ) : (
      <ModelMesh additions={additions} block={block} meshProps={{ ...meshProps }} materialProps={materialProps} />
    );
  }

  return undefined;
};

export default MeshRenderer;
