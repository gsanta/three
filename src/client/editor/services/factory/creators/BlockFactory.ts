/* eslint-disable @typescript-eslint/no-unused-vars */
import BlockConstantData from '@/client/editor/models/block/BlockConstantData';
import BlockData from '@/client/editor/models/block/BlockData';
import { BlockDecorationType, PartialBlockDecorations } from '@/client/editor/models/block/BlockDecoration';
import BlockCreator from './BlockCreator';
import SceneService from '@/client/editor/ui/scene/service/SceneService';
import BlockTypeStore from '@/client/editor/stores/blockType/BlockTypeStore';

class BlockFactory {
  constructor(blockTypeStore: BlockTypeStore, sceneService: SceneService) {
    this.sceneService = sceneService;

    this.blockTypeStore = blockTypeStore;
  }

  create(blockType: BlockConstantData, overrides: Partial<BlockData> = {}): BlockData {
    const block = BlockCreator.create(this.sceneService.uuid(blockType), blockType, overrides);

    return block;
  }

  createDecorations(block: BlockData, overrides: PartialBlockDecorations): BlockDecorationType[] {
    const decorations = this.blockTypeStore.getDecorations(block.type);

    const newDecorations = Object.values(decorations).map((decoration) => {
      const override = overrides[decoration.decoration] || {};

      return {
        ...decoration,
        ...override,
        id: block.id,
      };
    }) as BlockDecorationType[];

    return newDecorations;
  }

  protected sceneService: SceneService;

  protected blockTypeStore: BlockTypeStore;
}

export default BlockFactory;
