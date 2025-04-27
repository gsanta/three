import Block from '../../models/Block';
import BlockModel from '../../models/BlockModel';
import Pole from '../../models/Pole';

class JoinPoleToHouse {
  constructor() {}

  join(pole: Block, house: Block) {
    const poleModel = new Pole(pole);

    const houseModel = new BlockModel(house);
    houseModel.checkCategory('houses');
  }
}

export default JoinPoleToHouse;
