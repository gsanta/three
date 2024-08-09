import Block from '../../types/Block';

interface Updater {
  category: string;

  updateDirtyBlock(block: Block): boolean;
}

export default Updater;
