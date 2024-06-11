import GetAddBlockToCategoryStrategy, { AddStrategyType, GetStrategyParams } from './GetAddBlockToCategoryStrategy';

class GetAddBlockToRoofStrategy extends GetAddBlockToCategoryStrategy {
  getStrategy({ newBlockType }: GetStrategyParams): AddStrategyType | undefined {
    if (newBlockType.category === 'weather-heads') {
      return 'source-origin-target-pointer-pos';
    }

    return undefined;
  }
}

export default GetAddBlockToRoofStrategy;
