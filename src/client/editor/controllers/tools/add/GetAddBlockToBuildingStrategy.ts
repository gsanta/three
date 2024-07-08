import GetAddBlockToCategoryStrategy, { AddStrategyType, GetStrategyParams } from './GetAddBlockToCategoryStrategy';

class GetAddBlockToBuildingStrategy extends GetAddBlockToCategoryStrategy {
  getStrategy({ targetBlock, targetPartIndex, newBlockType }: GetStrategyParams): AddStrategyType | undefined {
    if (!targetPartIndex) {
      return undefined;
    }

    const targetPartCategory = targetBlock.partDetails[targetPartIndex]?.category;
    if (targetPartCategory === 'wall-slot' && newBlockType.category === 'walls') {
      return 'source-origin-target-slot';
    }

    if (targetPartCategory === 'ceil-slot' && newBlockType.category === 'roofs') {
      return 'source-origin-target-slot';
    }

    if (targetPartCategory === 'floor-slot' && newBlockType.category === 'home-electrics') {
      return 'source-origin-target-pointer-pos';
    }

    return undefined;
  }
}

export default GetAddBlockToBuildingStrategy;
