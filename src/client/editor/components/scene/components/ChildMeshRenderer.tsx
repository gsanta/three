import { useAppSelector } from '@/client/common/hooks/hooks';
import WrappedMeshProps from '@/client/editor/models/block/WrappedMeshProps';
import MeshRenderer from './MeshRenderer';

type ChildMeshRendererProps = Omit<WrappedMeshProps, 'block' | 'parent'> & {
  blockId: string;
  slice: 'city' | 'building';
};

const ChildMeshRenderer = (props: ChildMeshRendererProps) => {
  const { blockId, slice, ...rest } = props;
  const block = useAppSelector((selector) =>
    slice === 'city' ? selector.block.present.blocks[blockId] : selector.building.present.blocks[blockId],
  );

  return <MeshRenderer {...rest} block={block} />;
};

export default ChildMeshRenderer;
