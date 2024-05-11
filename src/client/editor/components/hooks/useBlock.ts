import { useAppSelector } from '@/client/common/hooks/hooks';
import BlockType from '../../types/BlockType';

const useBlock = (blockName?: string): BlockType => {
  const { blocks } = useAppSelector((state) => state.template.present);

  const block = blocks.find((b) => b.name === blockName);

  if (!block) {
    throw new Error('Block not found: ' + blockName);
  }

  return block;
};

export default useBlock;
