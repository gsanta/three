import { BlockName } from '@/client/editor/types/BlockType';
import ToolStore from '../../../tool/ToolStore';
import Tool, { ToolInfo } from '../../../tool/service/Tool';
import ToolName from '../../../tool/state/ToolName';
import BlockStore from '../../BlockStore';
import UpdateService from '../../services/update/UpdateService';
import SceneStore from '../../../scene/SceneStore';
import MeshUtils from '@/client/editor/utils/MeshUtils';
import { Vector3 } from 'three';
import { toRadian } from '@/client/editor/utils/mathUtils';

class AddTool extends Tool {
  constructor(store: BlockStore, scene: SceneStore, toolStore: ToolStore, update: UpdateService) {
    super(store, update, ToolName.Add, 'BiPlus');

    this.scene = scene;
    this.toolStore = toolStore;
    this.updateService = update;
  }

  onPointerDown({ pos }: ToolInfo) {
    const { selectedBlockName } = this.store.getBlockSettings();

    if (!selectedBlockName) {
      return;
    }

    this.updateService
      .getUpdate()
      .create(selectedBlockName, { position: [pos.x, pos.y, pos.z] })
      .commit();
  }

  addToSlot() {
    const { templateName } = this.toolStore.getSelectOptions();
    const blockId = this.store.getSelectedBlockIds()[0];
    const partName = this.store.getSelectedPartNames()[0];

    if (!blockId || !partName) {
      return;
    }

    const mesh = this.scene.getObj3d(blockId);

    if (!mesh) {
      return;
    }

    const partMesh = MeshUtils.findByName(mesh, partName);
    const pos = new Vector3();
    partMesh.getWorldPosition(pos);

    const block = this.store.getBlocks()[blockId];

    const orientation = block.parts.find((part) => part.name === partName)?.orientation || 0;

    if (templateName) {
      this.updateService
        .getUpdate()
        .create(templateName as BlockName, { position: [pos.x, pos.y, pos.z], rotation: [0, orientation, 0] })
        .commit();
    }
  }

  private scene: SceneStore;

  private updateService: UpdateService;

  private toolStore: ToolStore;
}

export default AddTool;
