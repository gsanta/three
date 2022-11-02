import { IconName } from '@/ui/components/icon/Icon';
import { CanvasService } from '../CanvasService';
import Tool from './Tool';
import ToolName from './ToolName';

class ExternalTool implements Tool {
  name: ToolName;

  iconName: IconName;

  private module: CanvasService;

  constructor(name: ToolName, iconName: IconName, module: CanvasService) {
    this.name = name;
    this.iconName = iconName;
    this.module = module;
  }

  activate(): void {
    this.module.setActiveTool(this.name);
  }
}

export default ExternalTool;
