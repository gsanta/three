import Block from '@/client/editor/models/Block';
import BlockType from '@/client/editor/models/BlockType';
import Num3 from '@/client/editor/models/Num3';
import BlockAddMethod from '@/common/model_types/BlockAddMethod';

type ExecuteAddParams = {
  addMethod: BlockAddMethod;
  executionPhase: 'afterRender' | 'render';
  targetBlock: Block | undefined;
  targetPartIndex: string | undefined;
  newBlockType: BlockType;
  clientX: number;
  clientY: number;
  position: Num3;
};

export default ExecuteAddParams;
