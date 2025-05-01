import { useAppSelector } from '@/client/common/hooks/hooks';
import BlockConstantData from '../../models/block/BlockConstantData';

const useTemplate = (blockType?: string): BlockConstantData | undefined => {
  const { blocks } = useAppSelector((state) => state.blockType);

  const block = blocks.find((b) => b.type === blockType);

  return block;
};

export default useTemplate;
