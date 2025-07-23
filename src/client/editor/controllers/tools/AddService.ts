import { BlockCategoryName } from '../../models/block/BlockCategoryName';
import BlockConstantData from '../../models/block/BlockConstantData';
import BlockData from '../../models/block/BlockData';
import Vector from '../../models/math/Vector';
import BuildService from '../../services/BuildService';
import FactoryService from '../../services/factory/FactoryService';
import TransactionService from '../../services/transaction/TransactionService';
import BlockStore from '../../stores/block/BlockStore';
import BlockTypeStore from '../../stores/blockType/BlockTypeStore';
import ElectricityService from '../../stores/electricity/ElectricityService';
import SceneStore from '../../ui/scene/SceneStore';
import SceneService from '../../ui/scene/service/SceneService';
import AddPole from '../../use_cases/block/add/AddPole';
import AddToAnchor from '../../use_cases/block/add/AddToAnchor';
import AddToAnchorAsChild from '../../use_cases/block/add/AddToAnchorAsChild';
import AddToPlain from '../../use_cases/block/add/AddToPlain';
import AddTransformer from '../../use_cases/block/add/AddTransformer';
import DrawCommand from '../../use_cases/block/add/DrawCommand';
import HistoryController from '../HistoryController';
import DrawService from './DrawService';

type AddInfo = {
  newBlockTemplate: BlockConstantData;
  position: Vector;
  targetPartName?: string;
  targetBlock?: BlockData;
};

class AddService implements DrawService {
  constructor(
    blockStore: BlockStore,
    blockTypeStore: BlockTypeStore,
    buildService: BuildService,
    electricityService: ElectricityService,
    factoryService: FactoryService,
    historyController: HistoryController,
    sceneStore: SceneStore,
    sceneService: SceneService,
    transactionService: TransactionService,
  ) {
    this.buildService = buildService;

    this.transactionService = transactionService;

    this.historyController = historyController;

    this.addPoles = new AddPole(blockStore, factoryService, sceneService, transactionService);
    this.addToPlain = new AddToPlain(factoryService, transactionService);
    this.addToAnchor = new AddToAnchor(factoryService, sceneStore, transactionService);
    this.addToAnchorAsChild = new AddToAnchorAsChild(factoryService, transactionService);
    this.addTranformer = new AddTransformer(
      blockStore,
      blockTypeStore,
      electricityService,
      factoryService,
      sceneStore,
      transactionService,
    );
  }

  canHandleCategory(category: BlockCategoryName): boolean {
    return category !== 'cables';
  }

  cancel(): void {
    this.historyController.undo();
  }

  finish(): void {
    this.activeDrawCommand?.finish();
  }

  add({ newBlockTemplate, position, targetBlock, targetPartName }: AddInfo) {
    const edit = this.transactionService.createTransaction();

    switch (newBlockTemplate.category) {
      case 'poles':
        this.addPoles.execute({ edit, newBlockType: newBlockTemplate, position: position });
        this.activeDrawCommand = this.addPoles;
        break;
      case 'roads':
        if (targetBlock && targetPartName) {
          this.addToAnchor.execute({
            edit,
            newBlockType: newBlockTemplate,
            newBlockAnchorRole: 'road-slot',
            to: {
              block: targetBlock,
              anchorPartName: targetPartName,
            },
          });
          this.activeDrawCommand = this.addToAnchor;
        } else {
          this.addToPlain.execute({ edit, newBlockType: newBlockTemplate, position: position });
          this.activeDrawCommand = this.addToPlain;
        }
        break;
      case 'houses':
      case 'humans':
      case 'plants':
        this.addToPlain.execute({ edit, newBlockType: newBlockTemplate, position: position });
        this.activeDrawCommand = this.addToPlain;
        break;
      case 'transformers':
        this.addTranformer.execute({
          edit,
          newBlockType: newBlockTemplate,
          position: position,
          to: {
            block: targetBlock,
            anchorPartName: targetPartName,
          },
        });

        this.activeDrawCommand = this.addTranformer;

        break;
      case 'conduits':
        if (targetBlock && targetPartName) {
          this.addToAnchorAsChild.execute({
            edit,
            newBlockType: newBlockTemplate,
            newBlockAnchorName: 'Holder',
            to: {
              block: targetBlock,
              anchorPartName: targetPartName,
            },
          });
          this.activeDrawCommand = this.addToAnchorAsChild;
        }
    }

    edit.commit({ history: true });
    this.buildService.setIsEditing({ cancelable: true, finishable: true });
  }

  getActiveAddCommand() {
    return this.activeDrawCommand;
  }

  private activeDrawCommand?: DrawCommand;

  private addTranformer: AddTransformer;

  private addPoles: AddPole;

  private addToPlain: AddToPlain;

  private addToAnchor: AddToAnchor;

  private addToAnchorAsChild: AddToAnchorAsChild;

  private buildService: BuildService;

  private historyController: HistoryController;

  private transactionService: TransactionService;
}

export default AddService;
