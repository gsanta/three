import assert from 'assert';
import ExtendedWorld from './ExtendedWorld';
import { Then, When } from '@cucumber/cucumber';

When('I turn on device {string}', function (this: ExtendedWorld, blockId: string) {
  const realBlockId = blockId === 'examined' ? this.env.testScene.storedBlockId || '' : blockId;
  const device = this.env.blockStore.getDecoration('devices', realBlockId);

  this.env.controller.deviceController.turnOn(device);
});

When('I turn off device {string}', function (this: ExtendedWorld, blockId: string) {
  const realBlockId = blockId === 'examined' ? this.env.testScene.storedBlockId || '' : blockId;
  const device = this.env.blockStore.getDecoration('devices', realBlockId);

  this.env.controller.deviceController.turnOff(device);
});

Then('The device {string} is turned {string}', function (this: ExtendedWorld, blockId: string, state: 'on' | 'off') {
  const realBlockId = blockId === 'examined' ? this.env.testScene.storedBlockId || '' : blockId;
  const device = this.env.blockStore.getDecoration('devices', realBlockId);

  assert.equal(device.isOn, state === 'on' ? true : false);
});
