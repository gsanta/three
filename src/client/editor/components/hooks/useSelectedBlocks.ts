import { useAppSelector } from '@/client/common/hooks/hooks';

const useSelectedBlocks = () => {
  const blocks = useAppSelector((store) => store.block.present.blocks);
  const selectedBlocks = useAppSelector((store) => store.blockCategory.selectedBlocks);

  return Object.keys(selectedBlocks)?.map((id) => blocks[id]) || [];
};

export default useSelectedBlocks;
