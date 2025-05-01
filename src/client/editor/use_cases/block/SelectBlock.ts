import { Vector3 } from 'three';
import SceneService from '../../components/scene/service/SceneService';
import SceneStore from '../../components/scene/SceneStore';
import BlockStore from '../../stores/block/BlockStore';
import BlockData from '@/client/editor/data/BlockData';
import { store } from '@/client/common/utils/store';
import { updateSelectTool } from '../../stores/tool/toolSlice';
import TransactionService from '../../services/transaction/TransactionService';
import BlockCategoryStore from '../../stores/blockCategory/BlockCategoryStore';

class SelectBlock {
  constructor(
    blockStore: BlockStore,
    blockCategoryStore: BlockCategoryStore,
    scene: SceneService,
    sceneStore: SceneStore,
    updateService: TransactionService,
  ) {
    this.blockCategoryStore = blockCategoryStore;
    this.blockStore = blockStore;
    this.scene = scene;
    this.sceneStore = sceneStore;
    this.updateService = updateService;
  }

  select(blockId: string | undefined, clientX: number, clientY: number) {
    if (blockId) {
      const alreadySelectedBlockIds = this.blockCategoryStore.getSelectedBlocks();
      if (!alreadySelectedBlockIds[blockId]) {
        const block = this.blockStore.getBlocks()[blockId];
        const edit = this.updateService.createTransaction();

        const alreadySelectedBlocks = Object.keys(alreadySelectedBlockIds).map((id) => this.blockStore.getBlock(id));

        edit.select([...alreadySelectedBlocks, this.blockStore.getBlock(blockId)]);

        store.dispatch(updateSelectTool({ moveAxis: block.moveAxis }));

        edit.commit();
      }
    } else {
      const edit = this.updateService.createTransaction();
      edit.select([]);
      edit.commit();
    }
  }

  private selectBlock(block: BlockData, clientX: number, clientY: number) {
    const mesh = this.sceneStore.getObj3d(block.id);

    if (!mesh) {
      return;
    }

    const pos = new Vector3();
    mesh.getWorldPosition(pos);

    const edit = this.updateService.createTransaction();

    const partIndex = this.checkPartIntersection(block, clientX, clientY);

    if (partIndex) {
      // edit.select(block, 'selected', partIndex);
      store.dispatch(updateSelectTool({ moveAxis: block.moveAxis }));
    } else {
      edit.select([block]);

      store.dispatch(updateSelectTool({ moveAxis: block.moveAxis }));
    }

    edit.commit();
  }

  private checkPartIntersection(block: BlockData, clientX: number, clientY: number) {
    const [intersects] = this.scene.intersection([block.id], clientX, clientY);

    // TODO find a better solution to skip non-selectable parts
    const blockIntersection = intersects.find(
      (intersection) => intersection.partIndex && intersection.partInfo?.name !== 'root',
    );

    if (blockIntersection) {
      return blockIntersection.partIndex;
    }

    return undefined;
  }

  private blockCategoryStore: BlockCategoryStore;

  private blockStore: BlockStore;

  private scene: SceneService;

  private sceneStore: SceneStore;

  private updateService: TransactionService;
}

export default SelectBlock;
