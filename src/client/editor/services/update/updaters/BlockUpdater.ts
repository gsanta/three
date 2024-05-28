/* eslint-disable @typescript-eslint/no-unused-vars */
import BlockType from '@/client/editor/types/BlockType';
import Block from '@/client/editor/types/Block';
import BlockCategory, { BlockCategoryType } from '@/client/editor/types/BlockCategory';
import SceneService from '@/client/editor/components/scene/SceneService';

abstract class BlockUpdater {
  readonly category?: BlockCategory;

  constructor(category?: BlockCategory) {
    this.category = category;
  }

  onUpdateDecorators(_newState: BlockCategoryType): BlockCategoryType {
    throw new Error('Unimplemented method');
  }
}

export default BlockUpdater;
