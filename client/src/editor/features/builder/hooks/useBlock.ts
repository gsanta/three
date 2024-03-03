import { useAppSelector } from '@/common/hooks/hooks';
import Block from '../types/Block';

const useBlock = (blockName?: string): Block => {
  const { blocks } = useAppSelector((state) => state.builder);

  const block = blocks.find((b) => b.name === blockName);

  if (!block) {
    throw new Error('Block not found: ' + blockName);
  }

  return block;
};

export default useBlock;
