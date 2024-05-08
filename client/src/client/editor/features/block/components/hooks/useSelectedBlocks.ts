import { useAppSelector } from '@/client/common/hooks/hooks';

const useSelectedBlocks = () => {
  const { blocks, selectedBlocks } = useAppSelector((store) => store.block.present);

  return Object.keys(selectedBlocks)?.map((id) => blocks[id]) || [];
};

export default useSelectedBlocks;
