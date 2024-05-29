import DeviceController from '../../controllers/DeviceController';
import TransactionService from '../transaction/TransactionService';

class ControllerService {
  constructor(updateService: TransactionService) {
    this.deviceController = new DeviceController(updateService);
  }

  readonly deviceController: DeviceController;
}

export default ControllerService;
