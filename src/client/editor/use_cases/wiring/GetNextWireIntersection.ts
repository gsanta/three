import SceneService from '../../components/scene/service/SceneService';
import BlockStore from '../../stores/block/BlockStore';
import Block from '../../types/Block';
import { CablePoint } from '../../types/block/Cable';
import { BlockIntersection } from '../IntersectMesh';

class GetNextWireIntersection {
  constructor(blockStore: BlockStore, sceneService: SceneService) {
    this.blockStore = blockStore;
    this.sceneService = sceneService;
  }

  execute(buildingBlock: Block, clientX: number, clientY: number, cableId?: string) {
    const intersectionTargets = [
      buildingBlock.id,
      ...this.blockStore.getDescendants(buildingBlock.id).map((descendant) => descendant.id),
    ];

    const [intersections] = this.sceneService.intersection(intersectionTargets, clientX, clientY, {
      withBoundingBox: true,
    });

    const existingCable = cableId ? this.blockStore.getDecoration('cables', cableId) : undefined;
    const lastPoint = existingCable?.points[existingCable?.points.length - 1];

    return this.getNextTarget(intersections, lastPoint);
  }

  private getNextTarget(
    blockIntersections: BlockIntersection[],
    lastCablePoint?: CablePoint,
  ): BlockIntersection | undefined {
    if (!lastCablePoint) {
      return this.getFirstPoint(blockIntersections);
    }

    const lastBlock = this.blockStore.getBlock(lastCablePoint.blockId);

    switch (lastBlock.category) {
      case 'walls':
        return this.getNextWirePointForWall(lastBlock, blockIntersections);
      case 'building-bases':
        return this.getNextWirePointForBuildingBase(lastCablePoint, blockIntersections);
      default:
        return undefined;
    }
  }

  private getNextWirePointForWall(wallBlock: Block, blockIntersections: BlockIntersection[]) {
    const target = blockIntersections.find((intersection) =>
      ['wall-join', 'home-electrics'].includes(intersection.partInfo?.category || ''),
    );

    if (!target) {
      return;
    }

    if (target.block.neighbourTo.find((neighbour) => neighbour.blockId === wallBlock.id)) {
      return target;
    }
    return undefined;
  }

  private getNextWirePointForBuildingBase(cablePoint: CablePoint, blockIntersections: BlockIntersection[]) {
    return blockIntersections.find((intersection) => {
      if (intersection.block.category !== 'walls') {
        return false;
      }

      const found = intersection.block.neighbourTo.find(
        (neighbour) => neighbour.otherPartIndex === cablePoint.partIndex,
      );

      if (found) {
        return intersection;
      }

      return false;
    });
  }

  private getFirstPoint(blockIntersections: BlockIntersection[]) {
    const selectedIntersection = blockIntersections.find((intersection) => {
      if (intersection.block.category === 'walls') {
        return true;
      } else if (intersection.partInfo?.category === 'wall-join') {
        return true;
      }
      return false;
    });

    return selectedIntersection;
  }

  private blockStore: BlockStore;

  private sceneService: SceneService;
}

export default GetNextWireIntersection;
