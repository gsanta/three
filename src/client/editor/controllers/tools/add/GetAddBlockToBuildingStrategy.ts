import GetAddBlockToCategoryStrategy, { AddStrategyType, GetStrategyParams } from './GetAddBlockToCategoryStrategy';

class GetAddBlockToBuildingStrategy extends GetAddBlockToCategoryStrategy {
  getStrategy({ targetBlock, targetPartIndex, newBlockType }: GetStrategyParams): AddStrategyType | undefined {
    const targetPartCategory = targetBlock.partDetails[targetPartIndex]?.category;
    if (targetPartCategory === 'wall-slot' && newBlockType.category === 'walls') {
      return 'source-origin-target-slot';
    }

    if (targetPartCategory === 'ceil-slot' && newBlockType.category === 'roofs') {
      return 'source-origin-target-slot';
    }

    return undefined;
  }
}

export default GetAddBlockToBuildingStrategy;
