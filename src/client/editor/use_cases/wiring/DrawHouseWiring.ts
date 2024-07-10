import { Vector3 } from 'three';
import SceneService from '../../components/scene/service/SceneService';
import SceneStore from '../../components/scene/SceneStore';
import FactoryService from '../../services/factory/FactoryService';
import TransactionService from '../../services/transaction/TransactionService';
import BlockStore from '../../stores/block/BlockStore';
import Block from '../../types/Block';
import VectorUtils from '../../utils/vectorUtils';
import MeshUtils from '../../utils/MeshUtils';
import GetNextWireIntersection from './GetNextWireIntersection';
import { BlockIntersection } from '../IntersectMesh';
import AddWirePoints from './AddWirePoints';

class DrawHouseWiring {
  constructor(
    blockStore: BlockStore,
    factoryService: FactoryService,
    sceneService: SceneService,
    sceneStore: SceneStore,
    updateService: TransactionService,
  ) {
    this.blockStore = blockStore;
    this.factoryService = factoryService;
    this.sceneService = sceneService;
    this.sceneStore = sceneStore;
    this.updateService = updateService;
    this.addWirePoint = new AddWirePoints(this.blockStore, this.factoryService, this.updateService);
    this.getNextWireIntersection = new GetNextWireIntersection(this.blockStore, this.sceneService);
  }

  execute(targetBlockId: string, clientX: number, clientY: number) {
    const rootBlock = this.blockStore.getRoot(targetBlockId);

    const cableId = rootBlock.children.find((child) => this.blockStore.getBlock(child).category === 'cables');

    const selectedIntersection = this.getSelectedIntersection(rootBlock, clientX, clientY, cableId);

    if (!selectedIntersection) {
      return;
    }

    const point = this.getNewWirePoint(rootBlock, selectedIntersection);

    if (!point) {
      return;
    }

    this.addWirePoint.add(rootBlock, [
      { position: point, blockId: selectedIntersection.block.id, partIndex: selectedIntersection.partIndex },
    ]);
  }

  private getSelectedIntersection(rootBlock: Block, clientX: number, clientY: number, cableId?: string) {
    if (rootBlock.category === 'building-bases') {
      return this.getNextWireIntersection.execute(rootBlock, clientX, clientY, cableId);
    }

    return undefined;
  }

  private getNewWirePoint(rootBlock: Block, intersection: BlockIntersection) {
    const rootMesh = this.sceneStore.getObj3d(rootBlock.id);
    const baseMesh = MeshUtils.findByName(rootMesh, 'root');
    const basePos = new Vector3();
    baseMesh.getWorldPosition(basePos);

    // if (targetBlock.type === 'socket-1') {
    //   const worldPos = new Vector3();

    //   point = mesh.getWorldPosition(worldPos).toArray();
    // } else {

    if (intersection.meshes[0]) {
      const point = intersection.meshes[0].object.boungingBox?.center || [0, 0, 0];

      return VectorUtils.sub(point, basePos.toArray());
    }

    return undefined;
  }

  private addWirePoint: AddWirePoints;

  private getNextWireIntersection: GetNextWireIntersection;

  private blockStore: BlockStore;

  private factoryService: FactoryService;

  private sceneService: SceneService;

  private sceneStore: SceneStore;

  private updateService: TransactionService;
}

export default DrawHouseWiring;
