import SceneStore from '../../components/scene/SceneStore';
import Edit from '../../services/update/Edit';
import Block from '../../types/Block';
import MeshUtils from '../../utils/MeshUtils';
import MathUtils, { toDegree } from '../../utils/mathUtils';
import FactoryService from '../../services/factory/FactoryService';

class AddBlockToSlot {
  constructor(factoryService: FactoryService, sceneStore: SceneStore) {
    this.factoryService = factoryService;
    this.sceneStore = sceneStore;
  }

  perform(edit: Edit, sourceBlock: Block, sourcePartName: string, templateName: string) {
    const mesh = this.sceneStore.getObj3d(sourceBlock.id);
    const sourcePartMesh = MeshUtils.findByName(mesh, sourcePartName);
    const sourcePart = sourceBlock.parts.find((part) => part.name === sourcePartName);

    const sourcePartPos = sourcePartMesh.position;
    const sourcePartOrientation = sourceBlock.partDetails[sourcePart?.index || '']?.orientation || 0;
    const finalRotation = MathUtils.normalizeAngle(toDegree(sourceBlock.rotation[1]) + sourcePartOrientation);

    this.factoryService.create(edit, templateName, {
      parent: sourceBlock.id,
      position: [sourcePartPos.x, sourcePartPos.y, sourcePartPos.z],
      rotation: [0, finalRotation, 0],
      slotTarget: {
        blockId: sourceBlock.id,
        slotName: sourcePartName,
      },
    });

    const lastBlock = edit.getLastBlock();

    edit.updateBlock(sourceBlock.id, {
      children: [lastBlock.id],
      slotSources: [{ slotName: sourcePartName, blockId: lastBlock.id }],
    });
  }

  private factoryService: FactoryService;

  private sceneStore: SceneStore;
}

export default AddBlockToSlot;
