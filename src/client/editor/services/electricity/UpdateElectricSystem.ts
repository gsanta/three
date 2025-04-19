import BlockStore from '../../stores/block/BlockStore';
import { UpdateBlocks } from '../../stores/block/blockSlice.types';
import ElectricityStore from '../../stores/electricity/ElectricityStore';
import { ElectricNodeInfo, ElectricNodeUpdate } from '../../stores/electricity/electricitySlice';
import Device from '../../models/block/Device';

function traverseDevices(
  root: Device,
  consumers: Set<string>,
  all: Map<string, Device>,
  ret: Record<string, ElectricNodeInfo>,
) {
  const visited = new Set();

  function dfs(device?: Device) {
    if (!device) {
      return;
    }

    ret[device.id] = {
      currentFlows: true,
      provider: root.id,
    };

    visited.add(device.id);
    consumers.delete(device.id);

    Object.values(device.pins).forEach((pin) => {
      pin?.connectedDevices.forEach((connectedDevice) => {
        if (!visited.has(connectedDevice) && consumers.has(connectedDevice)) {
          dfs(all.get(connectedDevice));
        }
      });
    });
  }

  dfs(root);
}

class UpdateElectricSystem {
  constructor(blockStore: BlockStore, electricSystemStore: ElectricityStore) {
    this.blockStore = blockStore;
    this.electricSystemStore = electricSystemStore;
  }

  update(updates: UpdateBlocks['blockUpdates']) {
    // updates.forEach((update) => {
    //   if ('remove' in update && update.remove.decorations.includes('devices')) {
    //     nodeUpdates.push({
    //       type: 'remove',
    //       id: update.remove.id,
    //     });
    //   } else if ('type' in update && 'decoration' in update && update.decoration.category === 'devices') {
    //     nodeUpdates.push({
    //       type: 'update',
    //       info: {},
    //     });
    //   }
    // });

    if (this.shouldUpdate(updates)) {
      this.doUpdate();
    }
  }

  private shouldUpdate(updates: UpdateBlocks['blockUpdates']) {
    return updates.find(
      (update) => 'type' in update && 'decoration' in update && update.decoration.category === 'devices',
    );
  }

  private doUpdate() {
    const devices = this.blockStore.getDecorationsAsArray('devices');
    const { all, consumers, providers } = this.categorizeDevices(devices);

    const info: Record<string, ElectricNodeInfo> = {};

    for (const provider of providers) {
      const device = all.get(provider);
      if (device) {
        traverseDevices(device, consumers, all, info);
      }
    }

    for (const consumer of consumers) {
      info[consumer] = {
        currentFlows: false,
        provider: null,
      };
    }

    const nodeUpdates: ElectricNodeUpdate[] = Object.entries(info).map(([key, val]) => ({
      id: key,
      info: val,
      type: 'update',
    }));

    this.electricSystemStore.update(nodeUpdates);
  }

  private categorizeDevices(devices: Device[]): {
    providers: Set<string>;
    consumers: Set<string>;
    all: Map<string, Device>;
  } {
    const consumers: Set<string> = new Set();
    const providers: Set<string> = new Set();
    const all: Map<string, Device> = new Map();

    for (const device of devices) {
      if (device.circuitComponent === 'consumer') {
        consumers.add(device.id);
      } else {
        providers.add(device.id);
      }

      all.set(device.id, device);
    }

    return {
      consumers,
      providers,
      all,
    };
  }

  private blockStore: BlockStore;

  private electricSystemStore: ElectricityStore;
}

export default UpdateElectricSystem;
