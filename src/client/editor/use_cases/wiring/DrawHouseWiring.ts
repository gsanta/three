import { Vector3 } from 'three';
import SceneService from '../../components/scene/SceneService';
import SceneStore from '../../components/scene/SceneStore';
import FactoryService from '../../services/factory/FactoryService';
import TransactionService from '../../services/transaction/TransactionService';
import BlockStore from '../../stores/block/BlockStore';
import Block from '../../types/Block';
import VectorUtils, { addVector, multiplyVector } from '../../utils/vectorUtils';
import MeshUtils from '../../utils/MeshUtils';
import GetNextWireIntersection from './GetNextWireIntersection';
import { BlockIntersection } from '../IntersectMesh';

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
    this.getNextWirePoint = new GetNextWireIntersection(this.blockStore, this.sceneService);
  }

  execute(targetBlockId: string, clientX: number, clientY: number) {
    const edit = this.updateService.getTransaction();

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

    let block: Block | null = null;

    if (cableId) {
      block = this.blockStore.getBlock(cableId);

      edit.updateDecoration('cables', cableId, {
        points: [
          { position: point, blockId: selectedIntersection.block.id, partIndex: selectedIntersection.partIndex },
        ],
      });
    } else {
      block = this.factoryService.create(
        edit,
        'cable-1',
        { dependsOn: [targetBlockId], parent: rootBlock.id },
        {
          cables: {
            points: [
              { position: point, blockId: selectedIntersection.block.id, partIndex: selectedIntersection.partIndex },
            ],
          },
        },
      );
    }

    edit.updateBlock(selectedIntersection.block.id, { associations: [block.id] });

    edit.updateBlock(rootBlock.id, { children: [block.id] });

    edit.commit();
  }

  private getSelectedIntersection(rootBlock: Block, clientX: number, clientY: number, cableId?: string) {
    if (rootBlock.category === 'building-bases') {
      return this.getNextWirePoint.execute(rootBlock, clientX, clientY, cableId);
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

    if (Number(intersection.meshes?.length) >= 2) {
      const point = multiplyVector(
        addVector(intersection.meshes?.[0].point.toArray(), intersection.meshes?.[1].point.toArray()),
        0.5,
      );

      return VectorUtils.sub(point, basePos.toArray());
    }

    return undefined;
  }

  private getNextWirePoint: GetNextWireIntersection;

  private blockStore: BlockStore;

  private factoryService: FactoryService;

  private sceneService: SceneService;

  private sceneStore: SceneStore;

  private updateService: TransactionService;
}

export default DrawHouseWiring;
