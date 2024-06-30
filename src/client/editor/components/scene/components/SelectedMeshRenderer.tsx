import { useAppSelector } from '@/client/common/hooks/hooks';
import WrappedMeshProps from '@/client/editor/types/block/WrappedMeshProps';
import MeshRenderer from './MeshRenderer';
import { addVector } from '@/client/editor/utils/vectorUtils';
import Num3 from '@/client/editor/types/Num3';

type DefaultMeshRendererProps = Omit<WrappedMeshProps, 'block' | 'parent'> & {
  blockId: string;
  transform: Num3;
};

const SelectedMeshRenderer = (props: DefaultMeshRendererProps) => {
  const { blockId, transform, ...rest } = props;
  const block = useAppSelector((selector) => selector.block.present.blocks[blockId]);

  if (!block.isSelected || block.parent) {
    return;
  }

  return <MeshRenderer {...rest} block={block} />;
};

export default SelectedMeshRenderer;
