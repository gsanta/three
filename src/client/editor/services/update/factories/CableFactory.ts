import BlockFactory from './BlockFactory';
import BlockCreator from './BlockCreator';
import Block from '@/client/editor/types/Block';
import BlockType from '@/client/editor/types/BlockType';
import Cable from '@/client/editor/types/block/Cable';
import mergeDeep from '@/client/editor/utils/mergeDeep';
import { PartialDeep } from 'type-fest';
import SceneService from '@/client/editor/components/scene/SceneService';

class CableFactory extends BlockFactory<'cables'> {
  constructor(sceneService: SceneService) {
    super(sceneService, 'cables');
  }

  create(blockType: BlockType, options: Partial<Block> = {}, decorationOptions: Partial<Cable> = {}) {
    const block = BlockCreator.create(this.sceneService.uuid(), blockType, options);
    const cable: Cable = { points: [], end1: null, end2: null, ...decorationOptions, category: 'cables', id: block.id };

    return {
      block,
      decoration: cable,
    };
  }

  updateDecoration(orig: Cable, partial: PartialDeep<Cable>) {
    const updated: Cable = mergeDeep<Cable>(orig, partial);

    return updated;
  }
}

export default CableFactory;
