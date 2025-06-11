import MeshWrapper from '@/client/editor/models/MeshWrapper';
import { Vector3 } from 'three';
import BlockData from '@/client/editor/models/block/BlockData';
import SceneStore from '@/client/editor/ui/scene/SceneStore';
import TransactionService from '../../services/transaction/TransactionService';
import FactoryService from '../../services/factory/FactoryService';
import BlockStore from '../../stores/block/BlockStore';
import Num3 from '../../models/math/Num3';
import Edit from '../../services/transaction/Edit';
import CableHelper from './CableHelper';
import Pole from '../../models/block/categories/Pole';
import BlockPartLookupData from '../../models/block/part/BlockPartLookupData';
import Vector from '../../models/math/Vector';

class JoinPoles {
  constructor(
    blockStore: BlockStore,
    scene: SceneStore,
    factory: FactoryService,
    transactionService: TransactionService,
  ) {
    this.blockStore = blockStore;
    this.factory = factory;
    this.scene = scene;
    this.transactionService = transactionService;

    this.cableHelper = new CableHelper(blockStore);
  }

  join(pole1: Pole, pole2: Pole) {
    const pole1EmptyPinIndex = pole1.getFirstEmptyPin('L1');
    const pole2EmptyPinIndex = pole2.getFirstEmptyPin('L1');

    if (pole1EmptyPinIndex === undefined || pole2EmptyPinIndex === undefined) {
      throw new Error('Precondition failed: no empty pin found.');
    }

    if (pole1EmptyPinIndex > 1 || pole2EmptyPinIndex > 1) {
      throw new Error('Precondition failed: only pin 0 or 1 are valid to join poles.');
    }

    const edit = this.transactionService.createTransaction();

    this.rotatePoles(pole1, pole2);

    pole1
      .getPoleDecorator()
      .wires.forEach((partName) =>
        this.joinPins(
          { pole: pole1.getBlock(), partName, pinIndex: pole1EmptyPinIndex },
          { pole: pole2.getBlock(), partName, pinIndex: pole2EmptyPinIndex },
        ),
      );

    edit.commit();
  }

  private rotatePoles(newPole: Pole, neighborPole: Pole) {
    const neighborNeighborPole = this.cableHelper.getSibling(neighborPole.getBlock(), 0);

    if (!neighborNeighborPole) {
      return;
    }

    const [pos1, pos2, pos3] = [
      neighborNeighborPole.position,
      neighborPole.getBlock().position,
      newPole.getBlock().position,
    ];

    const line1 = new Vector(pos1).subXZ(new Vector(pos2)).get();
    const line2 = new Vector(pos2).subXZ(new Vector(pos3)).get();
    const angle = -new Vector(line1).angle2(new Vector(line2));

    const halfAngle = angle / 2;

    const edit = this.transactionService.getOrCreateActiveTransaction();

    const neighbourRotation = [
      neighborPole.getBlock().rotation[0],
      neighborPole.getBlock().rotation[1] + Vector.toRadian(halfAngle),
      neighborPole.getBlock().rotation[2],
    ] as Num3;

    edit.updateBlock(neighborPole.getId(), {
      rotation: neighbourRotation,
    });

    neighborPole.getBlock().conduitConnections.forEach((conn) => {
      edit.updateBlock(conn.block, { isDirty: true });
    });

    edit.updateBlock(newPole.getId(), {
      rotation: [
        newPole.getBlock().rotation[0],
        neighbourRotation[1] + Vector.toRadian(halfAngle),
        newPole.getBlock().rotation[2],
      ],
    });
  }

  private joinPins(
    join1: { pole: BlockData; partName: string; pinIndex: number },
    join2: { pole: BlockData; partName: string; pinIndex: number },
  ) {
    let positions: Num3[] = [
      [0, 0, 0],
      [0, 0, 0],
    ];

    positions = this.getPositions(join1.pole, join2.pole, join1.partName, join2.partName);

    const edit = this.transactionService.getOrCreateActiveTransaction();

    this.factory.create(edit, 'cable-1', {
      block: {
        multiParentConnections: [{ block: join1.pole.id }, { block: join2.pole.id }],
        isDirty: true,
      },
      decorations: {
        cables: {
          end1: { partName: join1.partName, device: join1.pole.id, pinIndex: join1.pinIndex },
          end2: { partName: join2.partName, device: join2.pole.id, pinIndex: join2.pinIndex },
          points: [
            { position: positions[0], blockId: join1.pole.id },
            { position: positions[1], blockId: join2.pole.id },
          ],
        },
      },
    });

    const cable = edit.getLastBlock();

    console.log('join pole cables', cable.id);

    this.updatePole(edit, cable, join1.pole, join1.partName, join1.pinIndex);
    this.updatePole(edit, cable, join2.pole, join2.partName, join2.pinIndex);
  }

  private updatePole(edit: Edit, cable: BlockData, pole: BlockData, partName: string, pinIndex: number) {
    edit.updateBlock(pole.id, {
      conduitConnections: [{ block: cable.id, pinIndex: pinIndex, thisPart: partName }],
      partDetails: {
        [partName]: {
          ...pole.partDetails[partName],
          isConnected: {
            [pinIndex]: true,
          },
        } as BlockPartLookupData,
      },
    });
  }

  private getPositions(pole1: BlockData, pole2: BlockData, partName1: string, partName2: string) {
    const mesh1 = this.scene.getObj3d(pole1.id);
    const mesh2 = this.scene.getObj3d(pole2.id);

    const pinName1 = partName1;
    const pinName2 = partName2;

    const pinMesh1 = new MeshWrapper(mesh1).findByNameOld(pinName1);
    const pinMesh2 = new MeshWrapper(mesh2).findByNameOld(pinName2);
    const pos1 = new Vector3();
    pinMesh1.getWorldPosition(pos1);
    const pos2 = new Vector3();
    pinMesh2.getWorldPosition(pos2);

    return [pos1.toArray(), pos2.toArray()];
  }

  private cableHelper: CableHelper;

  private blockStore: BlockStore;

  private factory: FactoryService;

  private scene: SceneStore;

  private transactionService: TransactionService;
}

export default JoinPoles;
