import { useAppSelector } from '@/common/hooks/hooks';
import Block from '../../../../types/Block';

const useBlock = (blockName?: string): Block => {
  const { blocks } = useAppSelector((state) => state.block.present);

  const block = blocks.find((b) => b.data.name === blockName);

  if (!block) {
    throw new Error('Block not found: ' + blockName);
  }

  return block;
};

export default useBlock;
