import SceneService from '../../ui/scene/service/SceneService';
import BlockFactory from './creators/BlockFactory';
import CableFactory from './creators/CableFactory';
import BlockData from '../../models/block/BlockData';
import { PartialBlockDecorations } from '../../models/block/BlockDecoration';
import Edit from '../transaction/Edit';
import BlockTypeStore from '../../stores/blockType/BlockTypeStore';

class FactoryService {
  constructor(blockTypeStore: BlockTypeStore, sceneService: SceneService) {
    this.blockTypeStore = blockTypeStore;
    this.factories.cables = new CableFactory(blockTypeStore, sceneService);
    this.defaultBlockFactory = new BlockFactory(blockTypeStore, sceneService);
  }

  create(
    edit: Edit,
    templateName: string,
    initialData: {
      block?: Partial<BlockData>;
      decorations?: PartialBlockDecorations;
    },
  ) {
    const template = this.blockTypeStore.getBlockType(templateName);

    if (!template) {
      throw new Error(`Template ${templateName} does not exist`);
    }

    const { block: initialBlock = {}, decorations: initialDecorations = {} } = initialData;

    const factory = this.factories[template.category] || this.defaultBlockFactory;
    const block = factory.create(template, initialBlock);

    Object.values(block.partDetails).forEach((partDetails) => {
      if (partDetails?.roles?.includes('pin')) {
        partDetails.isConnected = {};
        Array.from({ length: partDetails.pinCount || 2 }).forEach((_, index) => {
          partDetails.isConnected[index] = false;
        });
      }
    });

    edit.create(block);

    const decorations = factory.createDecorations(block, initialDecorations);

    decorations.forEach((decoration) => {
      edit.createDecoration(decoration);
    });

    return block;
  }

  private factories: Record<string, BlockFactory> = {};

  private defaultBlockFactory: BlockFactory;

  private blockTypeStore: BlockTypeStore;
}

export default FactoryService;
