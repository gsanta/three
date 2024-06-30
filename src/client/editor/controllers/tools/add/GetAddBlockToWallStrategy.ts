import GetAddBlockToCategoryStrategy, { AddStrategyType, GetStrategyParams } from './GetAddBlockToCategoryStrategy';

class GetAddBlockToWallStrategy extends GetAddBlockToCategoryStrategy {
  getStrategy({ newBlockType }: GetStrategyParams): AddStrategyType | undefined {
    if (newBlockType.category === 'home-electrics') {
      return 'source-origin-target-pointer-pos';
    }

    return undefined;
  }
}

export default GetAddBlockToWallStrategy;
