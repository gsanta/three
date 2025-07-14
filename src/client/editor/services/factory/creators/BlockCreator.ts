import BlockConstantData from '@/client/editor/models/block/BlockConstantData';
import Num3 from '@/client/editor/models/math/Num3';
import BlockData from '@/client/editor/models/block/BlockData';
import BlockPartLookupData from '@/client/editor/models/block/part/BlockPartLookupData';
import Vector from '@/client/editor/models/math/Vector';

class BlockCreator {
  static create(id: string, block: BlockConstantData, settings: Partial<BlockData>): BlockData {
    // const { position: pos = [0, 0, 0], ...rest } = settings;
    const pos = settings.position || [0, 0, 0];

    const selectedRotation = settings.rotation || [0, 0, 0];

    const x = pos[0]; //snapTo(pos[0]);
    const z = pos[2]; //snapTo(pos[2]);
    const y = pos[1]; // + positionData[1] + scale[1] / 2;
    const rotation = selectedRotation.map((degree) => Vector.toRadian(degree));

    const partDetails: Record<string, BlockPartLookupData | undefined> = {};

    Object.entries(block.partDetails).forEach(([key, val]) => {
      const info = { ...val, isSelected: val?.isSelected || false } as BlockPartLookupData;

      partDetails[key] = info;
    });

    return {
      ...block,
      childConnections: [],
      conduitConnections: settings.conduitConnections || [],
      groupChildConnections: settings.groupChildConnections || [],
      groupParentConnection: settings.groupParentConnection,
      id: settings.id || id,
      isDirty: settings.isDirty || false,
      isHovered: false,
      isPreview: settings.isPreview || false,
      isSelected: false,
      isVisible: settings.isVisible || true,
      materialProps: {},
      multiParentConnections: settings.multiParentConnections || [],
      notifyOnRender: false,
      parentConnection: settings.parentConnection,
      partDetails,
      position: [x, y, z],
      rotation: rotation as Num3,
      scale: [1, 1, 1],
    };
  }
}

export default BlockCreator;
