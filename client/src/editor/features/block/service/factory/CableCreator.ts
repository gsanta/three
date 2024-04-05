import { Vector3 } from 'three';
import BlockCreator from './BlockCreator';
import { getBlock } from '../../utils/blockUtils';
import MeshCreator from '../MeshCreator';
import { addMeshes } from '@/editor/services/scene/sceneSlice';

class CableCreator extends BlockCreator {
  create(points: Vector3[]) {
    const { blocks } = this.store.getState().block.present;
    const cableBlock = getBlock(blocks, 'cable');

    const mesh = MeshCreator.create(cableBlock, { points: points.map((point) => [point.x, point.y, point.z]) });

    this.store.dispatch(addMeshes([mesh]));
  }
}

export default CableCreator;
