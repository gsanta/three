import { IconName } from '@/ui/components/icon/Icon';
import ToolName from './ToolName';

interface Tool {
  name: ToolName;
  iconName: IconName;

  activate(): void;
}

export default Tool;
