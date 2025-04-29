import BlockType from '../../models/BlockType';
import BlockModel from '../../models/BlockModel';
import Pole from '../../models/Pole';

class JoinPoleToHouse {
  constructor() {}

  join(pole: BlockType, house: BlockType) {
    const poleModel = new Pole(pole);

    const houseModel = new BlockModel(house);
    houseModel.checkCategory('houses');
  }
}

export default JoinPoleToHouse;
