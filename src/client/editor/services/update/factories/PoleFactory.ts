import Pole, { PartialPole, Pins } from '@/client/editor/types/block/Pole';
import BlockFactory from './BlockFactory';
import BlockCreator from './BlockCreator';
import Block from '@/client/editor/types/Block';
import BlockType from '@/client/editor/types/BlockType';
import SceneService from '@/client/editor/components/scene/SceneService';

class PoleFactory extends BlockFactory<'poles'> {
  constructor(sceneService: SceneService) {
    super(sceneService, 'poles');
  }

  create(blockType: BlockType, options: Partial<Block> = {}) {
    const block = BlockCreator.create(this.sceneService.uuid(), blockType, options);
    const pole: Pole = { id: block.id, category: 'poles', pins: { pin1: [], pin2: [], pin3: [] } };

    return {
      block,
      decoration: pole,
    };
  }

  updateDecoration(orig: Pole, partial: PartialPole, options: { mergeArrays: boolean } = { mergeArrays: true }) {
    const { mergeArrays } = options;
    const pins: Partial<Pole['pins']> = {};

    Object.keys(orig.pins).forEach((p) => {
      const pin = p as Pins;
      pins[pin] = [...new Set([...(mergeArrays ? orig.pins[pin] : []), ...(partial.pins?.[pin] || [])])];
    });

    const updated: Pole = {
      ...orig,
      ...partial,
      pins: pins as Pole['pins'],
    };

    return updated;
  }
}

export default PoleFactory;
