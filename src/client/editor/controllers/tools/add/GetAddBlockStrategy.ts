import BlockType from '@/client/editor/types/BlockType';
import GetAddBlockToWallStrategy from './GetAddBlockToWallStrategy';
import GetAddBlockToCategoryStrategy, { GetStrategyParams, AddStrategyType } from './GetAddBlockToCategoryStrategy';
import GetAddBlockToRoofStrategy from './GetAddBlockToRoofStrategy';
import GetAddBlockToRoadStrategy from './GetAddBlockToRoadStrategy';
import GetAddBlockToBuildingStrategy from './GetAddBlockToBuildingStrategy';

class GetAddBlockStrategy {
  constructor() {
    this.strategyMap.roofs = new GetAddBlockToRoofStrategy();
    this.strategyMap['building-bases'] = new GetAddBlockToBuildingStrategy();
    this.strategyMap.roads = new GetAddBlockToRoadStrategy();
    this.strategyMap.walls = new GetAddBlockToWallStrategy();
  }

  getStrategy({
    targetBlock,
    targetPartIndex,
    newBlockType,
  }: Partial<GetStrategyParams> & { newBlockType: BlockType }): AddStrategyType | undefined {
    if (!targetBlock) {
      return 'source-origin-target-plane';
    }

    return this.strategyMap[targetBlock.category]?.getStrategy({ targetBlock, targetPartIndex, newBlockType });
  }

  private strategyMap: Record<string, GetAddBlockToCategoryStrategy> = {};
}

export default GetAddBlockStrategy;
