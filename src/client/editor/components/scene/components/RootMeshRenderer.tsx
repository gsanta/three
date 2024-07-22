import { useAppSelector } from '@/client/common/hooks/hooks';
import WrappedMeshProps from '@/client/editor/types/block/WrappedMeshProps';
import MeshRenderer from './MeshRenderer';

type RootMeshRendererProps = Omit<WrappedMeshProps, 'block' | 'parent'> & {
  blockId: string;
};

const RootMeshRenderer = (props: RootMeshRendererProps) => {
  const { blockId, ...rest } = props;
  const block = useAppSelector((selector) => selector.block.present.blocks[blockId]);

  if (block.parentConnection) {
    return;
  }

  return <MeshRenderer {...rest} block={block} />;
};

export default RootMeshRenderer;
