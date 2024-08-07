import Block from '../../types/Block';

interface Updater {
  category: string;

  updateDirtyBlock(block: Block): void;
}

export default Updater;
