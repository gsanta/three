import BlockData from '../../data/BlockData';
import BlockModel from '../../models/BlockModel';
import Pole from '../../models/Pole';

class JoinPoleToHouse {
  constructor() {}

  join(pole: BlockData, house: BlockData) {
    const poleModel = new Pole(pole);

    const houseModel = new BlockModel(house);
    houseModel.checkCategory('houses');
  }
}

export default JoinPoleToHouse;
