import { Vector3 } from 'three';
import SceneService from '../../components/scene/SceneService';
import SceneStore from '../../components/scene/SceneStore';
import FactoryService from '../../services/factory/FactoryService';
import TransactionService from '../../services/transaction/TransactionService';
import BlockStore from '../../stores/block/BlockStore';
import Block from '../../types/Block';
import Num3 from '../../types/Num3';
import VectorUtils, { addVector, multiplyVector } from '../../utils/vectorUtils';
import MeshUtils from '../../utils/MeshUtils';
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
  }

  execute(targetBlockId: string, existingCableId: string | null, clientX: number, clientY: number): string | null {
    const edit = this.updateService.getTransaction();

    const targetBlock = this.blockStore.getBlock(targetBlockId);

    const targetRootBlock = targetBlock.parent ? this.blockStore.getBlock(targetBlock.parent) : targetBlock;

    const intersectionTargets = [targetRootBlock.id, ...targetRootBlock.children];

    const targetRootMesh = this.sceneStore.getObj3d(targetRootBlock.id);
    const rootMesh = MeshUtils.findByName(targetRootMesh, 'root');
    const rootPos = new Vector3();
    rootMesh.getWorldPosition(rootPos);

    let point: Num3 | undefined = undefined;

    const [intersections] = this.sceneService.blockIntersection(intersectionTargets, clientX, clientY);

    const blockIntersection = this.getNextTarget(existingCableId, intersections);

    if (!blockIntersection) {
      return existingCableId;
    }

    // if (targetBlock.type === 'socket-1') {
    //   const worldPos = new Vector3();

    //   point = mesh.getWorldPosition(worldPos).toArray();
    // } else {

    if (Number(blockIntersection.meshes?.length) >= 2) {
      point = multiplyVector(
        addVector(blockIntersection.meshes?.[0].point.toArray(), blockIntersection.meshes?.[1].point.toArray()),
        0.5,
      );
    }
    // }

    if (!point) {
      return existingCableId;
    }

    point = VectorUtils.sub(point, rootPos.toArray());

    let block: Block | null = null;

    if (existingCableId) {
      edit.updateDecoration('cables', existingCableId, {
        points: [point],
        pointParents: [blockIntersection],
      });
    } else {
      block = this.factoryService.create(
        edit,
        'cable-1',
        { dependsOn: [targetBlockId], parent: targetBlock.parent },
        {
          cables: {
            points: [point],
            pointParents: [blockIntersection],
          },
        },
      );

      if (targetBlock.parent) {
        edit.updateBlock(targetBlock.parent, { children: [block.id] });
      }
    }

    edit.commit();

    return existingCableId || block?.id || null;
  }

  private getNextTarget(
    existingCableId: string | null,
    blockIntersections: BlockIntersection[],
  ): BlockIntersection | undefined {
    const targetBlock = this.blockStore.getBlock(blockIntersections[0].blockId);

    if (!existingCableId) {
      if (targetBlock.category === 'walls') {
        return blockIntersections[0];
      }

      return undefined;
    }

    const cable = this.blockStore.getDecoration('cables', existingCableId);
    const lastPointParent = cable.pointParents[cable.pointParents.length - 1];
    const lastBlock = this.blockStore.getBlock(lastPointParent.blockId);

    if (lastBlock.category === 'walls') {
      return this.getWallJoin(lastBlock, blockIntersections);
      // return (
      //   targetBlock.category === 'building-bases' &&
      //   lastPointParent.partIndex &&
      //   targetBlock.partDetails[lastPointParent.partIndex]?.category === 'wall-join'
      // );
    } else if (lastBlock.category === 'building-bases') {
      if (targetBlock.category === 'walls') {
        return blockIntersections[0];
      }
    }

    return undefined;
  }

  private getWallJoin(wallBlock: Block, blockIntersections: BlockIntersection[]) {
    const wallJoin = blockIntersections.find((intersection) => {
      const targetBlock = this.blockStore.getBlock(intersection.blockId);

      return targetBlock.partDetails[intersection.partIndex || '']?.category === 'wall-join';
    });

    if (!wallJoin) {
      return;
    }

    const buildingBlock = this.blockStore.getBlock(wallJoin.blockId);
    const wallJoinBlock = buildingBlock.partDetails[wallJoin.partIndex || ''];

    if (wallJoinBlock?.joins?.includes(wallBlock.slotTarget?.slotName || '')) {
      return wallJoin;
    }

    return undefined;
  }

  private blockStore: BlockStore;

  private factoryService: FactoryService;

  private sceneService: SceneService;

  private sceneStore: SceneStore;

  private updateService: TransactionService;
}

export default DrawHouseWiring;
