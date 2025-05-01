import BlockData from '@/client/editor/data/BlockData';
import BlockConstantData from '@/client/editor/data/BlockConstantData';
import Num3 from '@/client/editor/models/Num3';
import BlockAddMethod from '@/common/model_types/BlockAddMethod';

type ExecuteAddParams = {
  addMethod: BlockAddMethod;
  executionPhase: 'afterRender' | 'render';
  targetBlock: BlockData | undefined;
  targetPartIndex: string | undefined;
  newBlockType: BlockConstantData;
  clientX: number;
  clientY: number;
  position: Num3;
};

export default ExecuteAddParams;
