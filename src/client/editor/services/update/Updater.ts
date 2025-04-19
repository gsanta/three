import Block from '../../models/Block';

interface Updater {
  category: string;

  updateDirtyBlock(block: Block): boolean;
}

export default Updater;
