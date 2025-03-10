import Block from '@/client/editor/types/Block';
import BlockType from '@/client/editor/types/BlockType';
import Num3 from '@/client/editor/types/Num3';
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
