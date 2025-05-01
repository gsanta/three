import BlockType from '../../types/BlockType';

interface Updater {
  category: string;

  updateDirtyBlock(block: BlockType): boolean;
}

export default Updater;
