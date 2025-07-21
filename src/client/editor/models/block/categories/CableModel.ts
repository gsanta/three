import BlockModel from '../BlockModel';

class CableModel extends BlockModel {
  getAsElectricConsumer() {}

  getLeftConnector() {
    return this.block.multiParentConnections[0].block;
  }

  getRightConnector() {
    return this.block.multiParentConnections[1].block;
  }
}

export default CableModel;
