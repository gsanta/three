import BlockType from '@/client/editor/models/BlockType';
import BaseBlockType from '@/client/editor/models/BaseBlockType';
import Num3 from '@/client/editor/models/Num3';
import BlockAddMethod from '@/common/model_types/BlockAddMethod';

type ExecuteAddParams = {
  addMethod: BlockAddMethod;
  executionPhase: 'afterRender' | 'render';
  targetBlock: BlockType | undefined;
  targetPartIndex: string | undefined;
  newBlockType: BaseBlockType;
  clientX: number;
  clientY: number;
  position: Num3;
};

export default ExecuteAddParams;
