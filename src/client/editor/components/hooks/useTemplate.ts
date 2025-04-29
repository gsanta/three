import { useAppSelector } from '@/client/common/hooks/hooks';
import BaseBlockType from '../../models/BaseBlockType';

const useTemplate = (blockType?: string): BaseBlockType | undefined => {
  const { blocks } = useAppSelector((state) => state.blockType);

  const block = blocks.find((b) => b.type === blockType);

  return block;
};

export default useTemplate;
