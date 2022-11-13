import { IconName } from '@/ui/components/icon/Icon';
import { CanvasService } from '../CanvasService';
import Tool from './Tool';
import ToolName from './ToolName';
import ToolSelectionEvent from './ToolSelectionEvents';

class ExternalTool implements Tool {
  name: ToolName;

  iconName: IconName;

  private canvasService: CanvasService;

  private toolSelectionEvent?: ToolSelectionEvent;

  constructor(
    name: ToolName,
    iconName: IconName,
    canvasService: CanvasService,
    toolSelectionEvent?: ToolSelectionEvent,
  ) {
    this.name = name;
    this.iconName = iconName;
    this.canvasService = canvasService;
    this.toolSelectionEvent = toolSelectionEvent;
  }

  public getShortCut() {
    return this.toolSelectionEvent;
  }

  activate(): void {
    this.canvasService.setActiveTool(this.name);
  }
}

export default ExternalTool;
