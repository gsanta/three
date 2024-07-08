import { useAppSelector } from '@/client/common/hooks/hooks';
import WrappedMeshProps from '@/client/editor/types/block/WrappedMeshProps';
import MeshRenderer from './MeshRenderer';

type DefaultMeshRendererProps = Omit<WrappedMeshProps, 'block' | 'parent'> & {
  blockId: string;
};

const SelectedMeshRenderer = (props: DefaultMeshRendererProps) => {
  const { blockId, ...rest } = props;
  const block = useAppSelector((selector) => selector.block.present.blocks[blockId]);

  if (!block.isSelected) {
    return;
  }

  return <MeshRenderer {...rest} block={block} />;
};

export default SelectedMeshRenderer;
