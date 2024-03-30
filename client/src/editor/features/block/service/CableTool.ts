import { Store } from '@/common/utils/store';
import { addMesh, update, updateMesh } from '@/editor/services/scene/sceneSlice';
import Tool, { ToolInfo } from '@/editor/services/tool/service/Tool';
import ToolName from '@/editor/services/tool/state/ToolName';
import MeshCreator from './MeshCreator';
import { getBlock } from '../utils/blockUtils';
import { position } from '@chakra-ui/styled-system';

class CableTool extends Tool {
  constructor(store: Store) {
    super(store, ToolName.Cable);
  }

  onPointerDown({ pos, eventObjectName }: ToolInfo) {
    const { blocks } = this.store.getState().block.present;
    const cableBlock = getBlock(blocks, 'cable');

    const { roots, meshes } = this.store.getState().scene.present;

    const cable = roots.find((root) => meshes[root].name === 'cable');

    const mesh = meshes[eventObjectName];

    if (!cable) {
      this.store.dispatch(addMesh(MeshCreator.create(cableBlock, { points: [[pos.x, pos.y, pos.z]] })));
    } else {
      const newMesh = {
        ...meshes[cable],
        points: [...meshes[cable].points, [pos.x, pos.y, pos.z]],
      };

      this.store.dispatch(updateMesh(newMesh));
    }
  }
}

export default CableTool;
