import { IconName } from '@/ui/components/icon/Icon';
import ToolName from './ToolName';
import ToolSelectionEvent from './ToolSelectionEvents';

interface Tool<Data = unknown> {
  name: ToolName;
  iconName: IconName;

  activate(): void;
  deActivate(): void;
  getShortCut(): ToolSelectionEvent | undefined;

  setData(data: Data): void;
}

export default Tool;
