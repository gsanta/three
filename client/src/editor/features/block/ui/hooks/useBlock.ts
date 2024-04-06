import { useAppSelector } from '@/common/hooks/hooks';
import BlockData from '../../../../types/BlockData';

const useBlock = (blockName?: string): BlockData => {
  const { blocks } = useAppSelector((state) => state.addBlock.present);

  const block = blocks.find((b) => b.data.name === blockName);

  if (!block) {
    throw new Error('Block not found: ' + blockName);
  }

  return block;
};

export default useBlock;
