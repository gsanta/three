import { BlockCategoryName } from '../models/block/BlockCategoryName';
import BlockData from '../models/block/BlockData';
import Num3 from '../models/math/Num3';

export interface ConnectCable {
  category: BlockCategoryName;

  cancel(): void;

  finalize(): void;

  meshRendered(): void;

  start(blockData: BlockData): void;

  update(candidates: BlockData[], fallbackPos: Num3): void;
}

export interface ConnectCableFactory {
  category: BlockCategoryName;

  getConnector(from: BlockData): ConnectCable;
}

class CableConnector {
  constructor(connectors: Partial<Record<BlockCategoryName, ConnectCableFactory>>) {
    this.connectors = connectors;
  }

  getConnector(from: BlockData): ConnectCable | undefined {
    const connector = this.connectors[from.category];

    if (!connector) {
      return undefined;
    }

    return connector.getConnector(from);
  }

  private connectors: Partial<Record<BlockCategoryName, ConnectCableFactory>>;
}

export default CableConnector;
