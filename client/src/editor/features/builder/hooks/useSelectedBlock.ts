import { useAppSelector } from '@/common/hooks/hooks';

const useBlock = (blockName?: string) => {
  const { blocks } = useAppSelector((state) => state.builder);

  return blocks.find((block) => block.name === blockName);
};

export default useBlock;
