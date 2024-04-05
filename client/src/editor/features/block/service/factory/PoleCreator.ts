import { Store } from '@/common/utils/store';
import { Vector3 } from 'three';
import MeshCreator from '../MeshCreator';
import { addMeshes, updatePole } from '@/editor/services/scene/sceneSlice';
import { getBlock } from '../../utils/blockUtils';
import BlockCreator from './BlockCreator';

class PoleCreator extends BlockCreator {
  constructor(store: Store) {
    super(store, 'pole');
  }

  create(pos: Vector3) {
    const { blocks } = this.store.getState().block.present;
    const poleBlock = getBlock(blocks, 'pole');

    const meshData = MeshCreator.create(poleBlock, { position: [pos.x, pos.y, pos.z] });
    this.store.dispatch(addMeshes([meshData]));
    this.store.dispatch(updatePole({ id: meshData.id, pins: { pin1: null, pin2: null, pin3: null } }));
  }
}

export default PoleCreator;
