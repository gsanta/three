import { useAppSelector } from '@/client/common/hooks/hooks';
import BlockType from '../../types/BlockType';

const useTemplate = (blockType?: string): BlockType | undefined => {
  const { blocks } = useAppSelector((state) => state.blockType);

  const block = blocks.find((b) => b.type === blockType);

  return block;
};

export default useTemplate;
