import Block from '@/client/editor/types/Block';
import Cable, { CablePoint } from '@/client/editor/types/block/Cable';
import MeshUtils from '@/client/editor/utils/MeshUtils';
import { Vector3 } from 'three';
import BlockStore from '../../stores/block/BlockStore';
import SceneStore from '../../components/scene/SceneStore';
import TransactionService from '../transaction/TransactionService';

class UpdateDeviceCable {
  constructor(store: BlockStore, scene: SceneStore, transactionService: TransactionService) {
    this.scene = scene;
    this.store = store;
    this.transactionService = transactionService;
  }

  update(cable: Block) {
    const edit = this.transactionService.createTransaction();

    const newPoints = cable.conduitParentConnections.map((connection) =>
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

  private moveCable(cableId: string, pole: Block): CablePoint {
    const cable = this.store.getDecoration('cables', cableId) as Cable;

    let index = 0;
    let cableEnd = cable.end1;
    if (cable.end2?.device === pole.id) {
      index = 1;
      cableEnd = cable.end2;
    }

    if (!cableEnd?.pin) {
      return { ...cable.points[index] };
    }

    const poleMesh = this.scene.getObj3d(pole.id);
    const mesh = MeshUtils.findByName(poleMesh, cableEnd?.pin);

    const pos = new Vector3();
    mesh.getWorldPosition(pos);

    const newPoint = { position: pos.toArray() };

    return newPoint;
  }

  private store: BlockStore;

  private scene: SceneStore;

  private transactionService: TransactionService;
}

export default UpdateDeviceCable;
