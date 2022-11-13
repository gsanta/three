import { IconName } from '@/ui/components/icon/Icon';
import ToolName from './ToolName';
import ToolSelectionEvent from './ToolSelectionEvents';

interface Tool {
  name: ToolName;
  iconName: IconName;

  activate(): void;
  getShortCut(): ToolSelectionEvent | undefined;
}

export default Tool;
