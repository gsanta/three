import Block from '@/client/editor/types/Block';
import Cable from '@/client/editor/types/block/Cable';
import MeshUtils from '@/client/editor/utils/MeshUtils';
import { Vector3 } from 'three';
import BlockStore from '../../stores/block/BlockStore';
import SceneStore from '../../components/scene/SceneStore';
import TransactionService from '../transaction/TransactionService';
import Edit from '../transaction/Edit';

class UpdateDeviceCable {
  constructor(store: BlockStore, scene: SceneStore, transactionService: TransactionService) {
    this.scene = scene;
    this.store = store;
    this.transactionService = transactionService;
  }

  update(block: Block) {
    const edit = this.transactionService.getTransaction();
    const decoration = this.store.getDecoration('devices', block.id);

    Object.keys(decoration.pins).forEach((key) => {
      const cables = decoration.pins[key];
      cables?.wires.forEach((cable) => {
        this.moveCable(edit, cable, block);
      });
    });

    edit.commit(false);
  }

  private moveCable(edit: Edit, cableId: string, pole: Block) {
    const cable = this.store.getDecoration('cables', cableId) as Cable;

    let index = 0;
    let cableEnd = cable.end1;
    if (cable.end2?.device === pole.id) {
      index = 1;
      cableEnd = cable.end2;
    }

    if (!cableEnd?.pin) {
      return;
    }

    const poleMesh = this.scene.getObj3d(pole.id);
    const partName = pole.partDetails[cableEnd?.pin]?.name;
    const mesh = MeshUtils.findByName(poleMesh, partName);

    const pos = new Vector3();
    mesh.getWorldPosition(pos);

    const newPoints = [...cable.points];

    const newPoint = { position: pos.toArray() };

    newPoints.splice(index, 1, newPoint);

    edit.updateDecoration(
      'cables',
      cableId,
      {
        points: newPoints,
      },
      { arrayMergeStrategy: 'replace' },
    );
  }

  private store: BlockStore;

  private scene: SceneStore;

  private transactionService: TransactionService;
}

export default UpdateDeviceCable;
