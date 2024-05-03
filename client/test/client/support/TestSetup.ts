import { EditorContextType } from '@/app/editor/EditorContext';
import { store } from '@/client/common/utils/store';
import BlockStore from '@/client/editor/features/block/BlockStore';
import ExportJson from '@/client/editor/features/block/services/io/ExportJson';
import ImportJson from '@/client/editor/features/block/services/io/ImportJson';
import UpdateService from '@/client/editor/features/block/services/update/UpdateService';
import AddTool from '@/client/editor/features/block/use_cases/add/AddTool';
import CableTool from '@/client/editor/features/block/use_cases/cable/CableTool';
import ColorTool from '@/client/editor/features/block/use_cases/color/ColorTool';
import EraseTool from '@/client/editor/features/block/use_cases/erase/EraseTool';
import GroupTool from '@/client/editor/features/block/use_cases/group/GroupTool';
import MoveService from '@/client/editor/features/block/use_cases/move/MoveService';
import RayTool from '@/client/editor/features/block/use_cases/ray/RayTool';
import SelectTool from '@/client/editor/features/block/use_cases/select/SelectTool';
import SceneStore from '@/client/editor/features/scene/SceneStore';
import TemplateStore from '@/client/editor/features/template/TemplateStore';
import ToolStore from '@/client/editor/features/tool/ToolStore';
import KeyboardService from '@/client/editor/features/tool/service/KeyboardService';
import ToolService from '@/client/editor/features/tool/service/ToolService';

class TestSetup {
  constructor() {
    this.scene = new SceneStore();
    this.blockStore = new BlockStore(store);
    this.update = new UpdateService(this.blockStore, store);
    this.move = new MoveService(this.blockStore, this.update, this.scene);
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

  private move: MoveService;

  private templates: TemplateStore;

  private toolStore: ToolStore;
}

export default TestSetup;
