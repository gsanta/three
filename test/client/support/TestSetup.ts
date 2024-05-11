import { EditorContextType } from '@/app/editor/EditorContext';
import { store } from '@/client/common/utils/store';
import BlockStore from '@/client/editor/stores/block/BlockStore';
import ExportJson from '@/client/editor/controllers/io/ExportJson';
import ImportJson from '@/client/editor/controllers/io/ImportJson';
import UpdateService from '@/client/editor/services/update/UpdateService';
import AddTool from '@/client/editor/controllers/tools/AddTool';
import CableTool from '@/client/editor/controllers/tools/CableTool';
import ColorTool from '@/client/editor/controllers/tools/ColorTool';
import EraseTool from '@/client/editor/controllers/tools/EraseTool';
import GroupTool from '@/client/group/GroupTool';
import MoveBlock from '@/client/editor/use_cases/block/move/MoveBlock';
import RayTool from '@/client/editor/controllers/tools/RayTool';
import SelectTool from '@/client/editor/controllers/tools/SelectTool';
import SceneStore from '@/client/editor/components/scene/SceneStore';
import TemplateStore from '@/client/editor/stores/template/TemplateStore';
import ToolStore from '@/client/editor/stores/tool/ToolStore';
import KeyboardService from '@/client/editor/services/KeyboardService';
import ToolService from '@/client/editor/services/ToolService';

class TestSetup {
  constructor() {
    this.scene = new SceneStore();
    this.blockStore = new BlockStore(store);
    this.update = new UpdateService(this.blockStore, store);
    this.move = new MoveBlock(this.blockStore, this.update, this.scene);
    this.templates = new TemplateStore(store);
    this.toolStore = new ToolStore(store);
  }

  setup(): EditorContextType {
    return {
      tool: new ToolService(
        [
          new AddTool(this.blockStore, this.scene, this.toolStore, this.update),
          new SelectTool(this.blockStore, this.update, this.scene, this.move),
          new GroupTool(this.blockStore, this.update, this.templates),
          new CableTool(this.blockStore, this.scene, this.update),
          new EraseTool(this.blockStore, this.update),
          new RayTool(this.blockStore, this.update, this.scene),
          new ColorTool(this.blockStore, this.update),
        ],
        store,
      ),
      keyboard: new KeyboardService(store),
      exporter: new ExportJson(store),
      importer: new ImportJson(store),
      scene: this.scene,
    };
  }

  private scene: SceneStore;

  private blockStore: BlockStore;

  private update: UpdateService;

  private move: MoveBlock;

  private templates: TemplateStore;

  private toolStore: ToolStore;
}

export default TestSetup;
