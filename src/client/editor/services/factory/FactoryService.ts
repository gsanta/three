import SceneService from '../../components/scene/service/SceneService';
import BlockFactory from './creators/BlockFactory';
import PoleFactory from './creators/PoleFactory';
import CableFactory from './creators/CableFactory';
import Block from '../../models/Block';
import BlockDecoration, { PartialBlockCategories } from '../../models/BlockCategory';
import Edit from '../transaction/Edit';
import BlockStore from '../../stores/block/BlockStore';
import DefaultBlockFactory from './creators/DefaultBlockFactory';
import LampFactory from './creators/LampFactory';
import WeatherHeadFactory from './creators/WeatherHeadFactory';
import HomeElectricsFactory from './creators/HomeElectricsFactory';
import ElectricityProviderFactory from './creators/ElectricityProviderFactory';
import { BlockSlices } from '../../stores/block/blockSlice.types';
import TransformerFactory from './creators/TransformerFactory';

class FactoryService {
  constructor(blockStore: BlockStore, sceneService: SceneService) {
    this.blockStore = blockStore;
    this.factories.poles = new PoleFactory(sceneService);
    this.factories.cables = new CableFactory(sceneService);
    this.factories.lamps = new LampFactory(sceneService);
    this.factories['weather-heads'] = new WeatherHeadFactory(sceneService);
    this.factories['home-electrics'] = new HomeElectricsFactory(sceneService);
    this.factories['electricity-providers'] = new ElectricityProviderFactory(sceneService);
    this.factories.transformers = new TransformerFactory(sceneService);
    this.defaultBlockFactory = new DefaultBlockFactory(sceneService);
  }

  create(
    edit: Edit,
    templateName: string,
    initialData: {
      block?: Partial<Block>;
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
