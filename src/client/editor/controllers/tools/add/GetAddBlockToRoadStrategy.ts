import GetAddBlockToCategoryStrategy, { AddStrategyType, GetStrategyParams } from './GetAddBlockToCategoryStrategy';

class GetAddBlockToRoadStrategy extends GetAddBlockToCategoryStrategy {
  getStrategy({ newBlockType }: GetStrategyParams): AddStrategyType | undefined {
    if (newBlockType.category === 'roads') {
      return 'source-slot-target-slot';
    }

    return undefined;
  }
}

export default GetAddBlockToRoadStrategy;
