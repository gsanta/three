import { IconName } from '@/ui/components/icon/Icon';
import { ExternalModule } from '../ExternalModule';
import Tool from './Tool';
import ToolName from './ToolName';

class ExternalTool implements Tool {
  name: ToolName;

  iconName: IconName;

  private module: ExternalModule;

  constructor(name: ToolName, iconName: IconName, module: ExternalModule) {
    this.name = name;
    this.iconName = iconName;
    this.module = module;
  }

  activate(): void {
    this.module.setActiveTool(this.name);
  }
}

export default ExternalTool;
