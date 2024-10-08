import BlockType, { ModelPartInfo } from '@/client/editor/types/BlockType';
import { toRadian } from '@/client/editor/utils/mathUtils';
import VectorUtils, { addVector } from '@/client/editor/utils/vectorUtils';
import Num3 from '@/client/editor/types/Num3';
import Block from '@/client/editor/types/Block';

class BlockCreator {
  static create(id: string, block: BlockType, settings: Partial<Block>): Block {
    // const { position: pos = [0, 0, 0], ...rest } = settings;
    const pos = settings.position || [0, 0, 0];

    const { rotation: rotationData } = block;
    const selectedSize = settings.scale;
    const selectedRotation = settings.rotation || [0, 0, 0];
    const scale = VectorUtils.multiply(block.scale, selectedSize || [1, 1, 1]);

    const x = pos[0]; //snapTo(pos[0]);
    const z = pos[2]; //snapTo(pos[2]);
    const y = pos[1]; // + positionData[1] + scale[1] / 2;
    const rotation = addVector(selectedRotation, rotationData).map((degree) => toRadian(degree));

    const partDetails: Record<string, ModelPartInfo | undefined> = {};

    Object.entries(block.partDetails).forEach(([key, val]) => {
      const info = { ...val, isSelected: val?.isSelected || false } as ModelPartInfo;

      if (info.type === 'placeholder') {
        info.hide = true;
      }

      partDetails[key] = info;
    });

    return {
      ...block,
      childConnections: [],
      conduitParentConnections: settings.conduitParentConnections || [],
      conduitConnections: settings.conduitConnections || [],
      materialProps: {},
      neighbourConnections: [],
      isDirty: settings.isDirty || false,
      isHovered: false,
      isSelected: false,
      isVisible: true,
      notifyOnRender: false,
      parentConnection: settings.parentConnection,
      id: id,
      partDetails,
      position: [x, y, z],
      rotation: rotation as Num3,
      scale: scale,
    };
  }
}

export default BlockCreator;
