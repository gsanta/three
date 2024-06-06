import { useAppSelector } from '@/client/common/hooks/hooks';
import BlockType from '../../types/BlockType';

const useTemplate = (blockName?: string): BlockType | undefined => {
  const { blocks } = useAppSelector((state) => state.template.present);

  const block = blocks.find((b) => b.name === blockName);

  return block;
};

export default useTemplate;
