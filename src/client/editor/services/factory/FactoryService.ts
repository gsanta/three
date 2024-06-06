import SceneService from '../../components/scene/SceneService';
import BlockFactory from './creators/BlockFactory';
import PoleFactory from './creators/PoleFactory';
import CableFactory from './creators/CableFactory';
import Block from '../../types/Block';
import BlockCategory, { PartialBlockCategories } from '../../types/BlockCategory';
import Edit from '../update/Edit';
import BlockStore from '../../stores/block/BlockStore';
import DefaultBlockFactory from './creators/DefaultBlockFactory';
import LampFactory from './creators/LampFactory';
import WeatherHeadFactory from './creators/WeatherHeadFactory';

class FactoryService {
  constructor(blockStore: BlockStore, sceneService: SceneService) {
    this.blockStore = blockStore;
    this.factories.poles = new PoleFactory(sceneService);
    this.factories.cables = new CableFactory(sceneService);
    this.factories.lamps = new LampFactory(sceneService);
    this.factories['weather-heads'] = new WeatherHeadFactory(sceneService);
    this.defaultBlockFactory = new DefaultBlockFactory(sceneService);
  }

  create(
    edit: Edit,
    templateName: string,
    blockOverrides: Partial<Block> = {},
    categoryOverrides: PartialBlockCategories = {},
  ) {
    const template = this.blockStore.getTemplateByName(templateName);

    if (!template) {
      throw new Error(`Template ${templateName} does not exist`);
    }

    const factory = this.factories[template.type] || this.defaultBlockFactory;
    const block = factory.create(template, blockOverrides);

    edit.create(block);

    template.categories.forEach((categoryName: BlockCategory) => {
      const category = factory.createCategory(block, {
        ...categoryOverrides[categoryName],
        category: categoryName,
      });

      edit.createDecoration(category);
    });
  }

  private factories: Record<string, BlockFactory> = {};

  private defaultBlockFactory: DefaultBlockFactory;

  private blockStore: BlockStore;
}

export default FactoryService;
