import BlockData from '../../models/block/BlockData';

interface Updater {
  category: string;

  updateDirtyBlock(block: BlockData): boolean;
}

export default Updater;
