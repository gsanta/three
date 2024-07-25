import { useAppSelector } from '@/client/common/hooks/hooks';
import WrappedMeshProps from '@/client/editor/types/block/WrappedMeshProps';
import MeshRenderer from './MeshRenderer';

type RootMeshRendererProps = Omit<WrappedMeshProps, 'block' | 'parent'> & {
  blockId: string;
  slice: 'city' | 'building';
};

const RootMeshRenderer = (props: RootMeshRendererProps) => {
  const { blockId, slice, ...rest } = props;
  const block = useAppSelector((selector) =>
    slice === 'city' ? selector.block.present.blocks[blockId] : selector.building.present.blocks[blockId],
  );

  if (block.parentConnection) {
    return;
  }

  return <MeshRenderer {...rest} block={block} />;
};

export default RootMeshRenderer;
