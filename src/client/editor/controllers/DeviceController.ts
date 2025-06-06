import TransactionService from '../services/transaction/TransactionService';
import Device from '../models/block/categories/Device';

class DeviceController {
  constructor(updateService: TransactionService) {
    this.updateService = updateService;
  }

  turnOn(device: Device) {
    this.updateService.updateDevice(device.id, { isOn: true });
  }

  turnOff(device: Device) {
    this.updateService.updateDevice(device.id, { isOn: false });
  }

  private updateService: TransactionService;
}

export default DeviceController;
