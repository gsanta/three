import BlockFactory from './BlockFactory';
import BlockCreator from './BlockCreator';
import BlockData from '@/client/editor/models/block/BlockData';
import BlockConstantData from '@/client/editor/models/block/BlockConstantData';
import CableDecorator from '@/client/editor/models/block/categories/CableDecorator';
import mergeDeep from '@/client/editor/utils/mergeDeep';
import { PartialDeep } from 'type-fest';
import { BlockDecorationType, PartialBlockDecorations } from '@/client/editor/models/block/BlockDecoration';

const defaultCableDecoration: Partial<CableDecorator> = {
  end1: null,
  end2: null,
  points: [],
};

class CableFactory extends BlockFactory {
  create(blockType: BlockConstantData, overrides: Partial<BlockData> = {}) {
    const block = BlockCreator.create(this.sceneService.uuid(blockType), blockType, overrides);

    return block;
  }

  createDecorations(block: BlockData, overrides: PartialBlockDecorations): BlockDecorationType[] {
    const decorations = this.blockTypeStore.getDecorations(block.type);

    const newDecorations = Object.values(decorations).map((decoration) => {
      const override = overrides[decoration.decoration] || {};

      return {
        ...defaultCableDecoration,
        ...decoration,
        ...override,
        id: block.id,
      };
    }) as BlockDecorationType[];

    return newDecorations;
  }

  updateDecoration(orig: CableDecorator, partial: PartialDeep<CableDecorator>) {
    const updated: CableDecorator = mergeDeep<CableDecorator>(orig, partial, 'merge');

    return updated;
  }
}

export default CableFactory;
