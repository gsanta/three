import { IconName } from '@/ui/components/icon/Icon';
import { ExternalModule } from '../ExternalModule';
import Tool from './Tool';

class ExternalTool implements Tool {
  name: string;

  iconName: IconName;

  private module: ExternalModule;

  constructor(name: string, iconName: IconName, module: ExternalModule) {
    this.name = name;
    this.iconName = iconName;
    this.module = module;
  }

  activate(): void {
    this.module.selectTool(this.name);
  }
}

export default ExternalTool;
