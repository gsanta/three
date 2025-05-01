import BlockData from '../../data/BlockData';

interface Updater {
  category: string;

  updateDirtyBlock(block: BlockData): boolean;
}

export default Updater;
