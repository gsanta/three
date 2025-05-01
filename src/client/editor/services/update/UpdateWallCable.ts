import { Box3, Vector3 } from 'three';
import SceneStore from '../../components/scene/SceneStore';
import BlockData from '../../data/BlockData';
import MeshUtils from '../../utils/MeshUtils';
import TransactionService from '../transaction/TransactionService';

class UpdateWallCable {
  constructor(sceneStore: SceneStore, transactionService: TransactionService) {
    this.sceneStore = sceneStore;
    this.transactionService = transactionService;
  }

  update(cable: BlockData, room: BlockData, wallIndex: string) {
    if (!this.sceneStore.hasObj3d(room.id)) {
      return false;
    }

    const obj = this.sceneStore.getObj3d(room.id);
    const mesh = MeshUtils.findByName(obj, room.partDetails[wallIndex]?.name);

    const bbox = new Box3().setFromObject(mesh);

    const size = new Vector3();
    bbox.getSize(size);

    const center = new Vector3();
    bbox.getCenter(center);

    const edit = this.transactionService.createTransaction();

    if (size.x > size.z) {
      edit.updateDecoration(
        'cables',
        cable.id,
        {
          points: [
            {
              position: [bbox.min.x, center.y, center.z],
            },
            {
              position: [bbox.max.x, center.y, center.z],
            },
          ],
        },
        { arrayMergeStrategy: 'replace' },
      );
    } else {
      edit.updateDecoration(
        'cables',
        cable.id,
        {
          points: [
            {
              position: [center.x, center.y, bbox.min.z],
            },
            {
              position: [center.x, center.y, bbox.max.z],
            },
          ],
        },
        { arrayMergeStrategy: 'replace' },
      );
    }

    edit.commit(false);

    return true;
  }

  private sceneStore: SceneStore;

  private transactionService: TransactionService;
}

export default UpdateWallCable;
