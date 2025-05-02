import SceneService from '../../ui/scene/service/SceneService';
import BlockFactory from './creators/BlockFactory';
import PoleFactory from './creators/PoleFactory';
import CableFactory from './creators/CableFactory';
import BlockData from '../../models/block/BlockData';
import BlockDecoration, { PartialBlockCategories } from '../../models/block/BlockCategory';
import Edit from '../transaction/Edit';
import BlockStore from '../../stores/block/BlockStore';
import DefaultBlockFactory from './creators/DefaultBlockFactory';
import WeatherHeadFactory from './creators/WeatherHeadFactory';
import { BlockSlices } from '../../stores/block/blockSlice.types';
import TransformerFactory from './creators/TransformerFactory';

class FactoryService {
  constructor(blockStore: BlockStore, sceneService: SceneService) {
    this.blockStore = blockStore;
    this.factories.poles = new PoleFactory(sceneService);
    this.factories.cables = new CableFactory(sceneService);
    this.factories['weather-heads'] = new WeatherHeadFactory(sceneService);
    this.factories.transformers = new TransformerFactory(sceneService);
    this.defaultBlockFactory = new DefaultBlockFactory(sceneService);
  }

  create(
    edit: Edit,
    templateName: string,
    initialData: {
      block?: Partial<BlockData>;
      decorations?: PartialBlockCategories;
    },
    targetSlice?: BlockSlices,
  ) {
    const template = this.blockStore.getBlockType(templateName);

    if (!template) {
      throw new Error(`Template ${templateName} does not exist`);
    }

    const { block: initialBlock = {}, decorations: initialDecorations = {} } = initialData;

    const factory = this.factories[template.category] || this.defaultBlockFactory;
    const block = factory.create(template, initialBlock);

    edit.create(block, { slice: targetSlice });

    template.decorations.forEach((decorationName: BlockDecoration) => {
      const decoration = factory.createCategory(block, {
        ...initialDecorations[decorationName],
        category: decorationName,
      });

      edit.createDecoration(decoration, { slice: targetSlice });
    });

    return block;
  }

  private factories: Record<string, BlockFactory> = {};

  private defaultBlockFactory: DefaultBlockFactory;

  private blockStore: BlockStore;
}

export default FactoryService;
