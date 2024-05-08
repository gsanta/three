import { useAppSelector } from '@/client/common/hooks/hooks';

const useNotSelectedBlocks = () => {
  const { blocks, selectedBlocks } = useAppSelector((store) => store.block.present);

  return (
    Object.keys(blocks)
      ?.filter((id) => !selectedBlocks[id])
      .map((id) => blocks[id]) || []
  );
};

export default useNotSelectedBlocks;
