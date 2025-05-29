import BlockData from '@/client/editor/models/block/BlockData';
import BlockCategoryAction from '../BlockCategoryAction';
import ToolService from '@/client/editor/services/ToolService';
import ToolName from '@/client/editor/models/tool/ToolName';

class JoinCableAction implements BlockCategoryAction {
  name = 'join-cable-action';

  constructor(toolService: ToolService) {
    this.toolService = toolService;
  }

  execute(_block: BlockData): void {
    this.toolService.setSelectedTool(ToolName.Join);
  }

  private toolService: ToolService;
}

export default JoinCableAction;
