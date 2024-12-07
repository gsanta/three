import Block from '@/client/editor/types/Block';
import Cable, { CableEnd, CablePoint } from '@/client/editor/types/block/Cable';
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

  update(cableBlock: Block): boolean {
    const edit = this.transactionService.createTransaction();
    // const decoration = this.store.getDecoration('devices', cable.id);

    // Object.keys(decoration.pins).forEach((key) => {
    //   const cables = decoration.pins[key];
    //   cables?.wires.forEach((cable) => {
    //     this.moveCable(edit, cable, cable);
    //   });
    // });

    const parentNotAvailable = cableBlock.conduitParentConnections.find((parent) => this.scene.hasObj3d(parent.block));

    if (!parentNotAvailable) {
      return false;
    }

    const cable = this.store.getDecoration('cables', cableBlock.id) as Cable;

    const newPoints = [cable.end1, cable.end2].map((end, index) => this.moveCable(cableBlock.id, end, index));

    // const newPoints = cableBlock.conduitParentConnections.map((connection) =>
    //   this.moveCable(cableBlock.id, this.store.getBlock(connection.block)),
    // );

    edit.updateDecoration(
      'cables',
      cableBlock.id,
      {
        points: newPoints,
      },
      { arrayMergeStrategy: 'replace' },
    );

    edit.commit(false);
    return true;
  }

  private moveCable(cableId: string, cableEnd: CableEnd | null, index: number): CablePoint {
    const cable = this.store.getDecoration('cables', cableId) as Cable;

    const parentBlock = this.store.getBlock(cableEnd?.device);

    // let index = 0;
    // let cableEnd = cable.end1;
    // if (cable.end2?.device === pole.id) {
    //   index = 1;
    //   cableEnd = cable.end2;
    // }

    if (!cableEnd?.pin) {
      return { ...cable.points[index] };
    }

    const poleMesh = this.scene.getObj3d(parentBlock.id);
    const partName = parentBlock.partDetails[cableEnd?.pin]?.name;
    const mesh = MeshUtils.findByName(poleMesh, partName);

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
