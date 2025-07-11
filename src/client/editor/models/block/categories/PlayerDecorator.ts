import { WorldPositionPath } from '@/client/editor/use_cases/grid/WorldPositionPathBuilder';

type PlayerDecorator = {
  currentMovementPath: WorldPositionPath | undefined;
  decoration: 'player';
  remainingWork: number;
  maxWork: number;
  id: string;
};

export default PlayerDecorator;
