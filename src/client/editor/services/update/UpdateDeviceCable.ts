import BlockData from '@/client/editor/models/block/BlockData';
import CableDecorator, { CablePoint } from '@/client/editor/models/block/categories/CableDecorator';
import MeshWrapper from '@/client/editor/models/MeshWrapper';
import { Vector3 } from 'three';
import BlockStore from '../../stores/block/BlockStore';
import SceneStore from '../../ui/scene/SceneStore';
import TransactionService from '../transaction/TransactionService';

class UpdateDeviceCable {
  constructor(store: BlockStore, scene: SceneStore, transactionService: TransactionService) {
    this.scene = scene;
    this.store = store;
    this.transactionService = transactionService;
  }

  update(cable: BlockData) {
    const edit = this.transactionService.createTransaction();

    const newPoints = cable.multiParentConnections.map((connection) =>
      this.moveCable(cable.id, this.store.getBlock(connection.block)),
    );

    edit.updateDecoration(
      'cables',
      cable.id,
      {
        points: newPoints,
      },
      { arrayMergeStrategy: 'replace' },
    );

    edit.commit(false);
  }

  private moveCable(cableId: string, pole: BlockData): CablePoint {
    const cable = this.store.getDecorator('cables', cableId) as CableDecorator;

    let index = 0;
    let cableEnd = cable.end1;
    if (cable.end2?.device === pole.id) {
      index = 1;
      cableEnd = cable.end2;
    }

    if (!cableEnd?.partName) {
      return { ...cable.points[index] };
    }

    const poleMesh = this.scene.getObj3d(pole.id);
    const mesh = new MeshWrapper(poleMesh).findByNameOld(cableEnd?.partName);

    const pos = new Vector3();
    mesh.getWorldPosition(pos);

    const newPoint = { position: pos.toArray(), blockId: pole.id };

    return newPoint;
  }

  private store: BlockStore;

  private scene: SceneStore;

  private transactionService: TransactionService;
}

export default UpdateDeviceCable;
