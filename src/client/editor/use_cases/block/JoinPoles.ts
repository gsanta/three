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

  join(pole: BlockData) {
    const otherPoles = this.blockStore
      .getBlocksAsArray()
      .filter((block) => block.category === 'poles')
      .filter((currPole) => currPole.id !== pole.id);

    const { poleId: neighborPoleId } = otherPoles.reduce(
      (closest, next) => {
        const newDistance = new Vector(pole.position).distance(new Vector(next.position));
        if (closest.distance === -1 || closest.distance > newDistance) {
          return {
            poleId: next.id,
            distance: newDistance,
          };
        }

        return closest;
      },
      {
        poleId: '',
        distance: -1,
      },
    );

    if (!neighborPoleId) {
      return;
    }

    const neighborPole = this.blockStore.getBlock(neighborPoleId);

    const neighbourPoleEmptyWireConnectionNames = this.getEmptyWireConnectionNames(neighborPole);
    const poleEmptyWireConnectionNames = Pole.PRIMARY_WIRE_CONNECTION_NAMES_A;

    const pairs = neighbourPoleEmptyWireConnectionNames.map((neighbour, i) => [
      neighbour,
      poleEmptyWireConnectionNames[i],
    ]);

    this.rotatePoles(pole, neighborPole);

    pairs.forEach(([partIndex1, partIndex2]) => this.joinPins(pole, neighborPole, partIndex1, partIndex2));
  }

  private getEmptyWireConnectionNames(poleBlock: BlockData) {
    const pole = new Pole(poleBlock);

    if (pole.arePrimaryWireConnectionsEmpty('a')) {
      return Pole.PRIMARY_WIRE_CONNECTION_NAMES_A;
    } else if (pole.arePrimaryWireConnectionsEmpty('b')) {
      return Pole.PRIMARY_WIRE_CONNECTION_NAMES_B;
    }

    throw new Error('Precondition failed: primary wire connections are not empty, can not join poles.');
  }

  private rotatePoles(newPole: BlockData, neighborPole: BlockData) {
    const neighborNeighborPole = this.cableHelper.getSibling(neighborPole, 0);

    if (!neighborNeighborPole) {
      return;
    }

    const [pos1, pos2, pos3] = [neighborNeighborPole.position, neighborPole.position, newPole.position];

    const line1 = new Vector(pos1).subXZ(new Vector(pos2)).get();
    const line2 = new Vector(pos2).subXZ(new Vector(pos3)).get();
    const angle = -new Vector(line1).angle2(new Vector(line2));

    const halfAngle = angle / 2;

    const edit = this.transactionService.getOrCreateActiveTransaction();

    const neighbourRotation = [
      neighborPole.rotation[0],
      neighborPole.rotation[1] + Vector.toRadian(halfAngle),
      neighborPole.rotation[2],
    ] as Num3;

    edit.updateBlock(neighborPole.id, {
      rotation: neighbourRotation,
    });

    neighborPole.conduitConnections.forEach((conn) => {
      edit.updateBlock(conn.block, { isDirty: true });
    });

    edit.updateBlock(newPole.id, {
      rotation: [newPole.rotation[0], neighbourRotation[1] + Vector.toRadian(halfAngle), newPole.rotation[2]],
    });

    return;
  }

  private joinPins(pole1: BlockData, pole2: BlockData, partIndex1: string, partIndex2: string) {
    let positions: Num3[] = [
      [0, 0, 0],
      [0, 0, 0],
    ];

    positions = this.getPositions(pole1, pole2, partIndex1, partIndex2);

    const edit = this.transactionService.getOrCreateActiveTransaction();

    this.factory.create(edit, 'cable-1', {
      block: {
        multiParentConnections: [{ block: pole1.id }, { block: pole2.id }],
        isDirty: true,
      },
      decorations: {
        cables: {
          end1: { pin: partIndex1, device: pole1.id },
          end2: { pin: partIndex2, device: pole2.id },
          points: [
            { position: positions[0], blockId: pole1.id },
            { position: positions[1], blockId: pole2.id },
          ],
        },
      },
    });

    const cable = edit.getLastBlock();

    this.updatePole(edit, cable, pole1, partIndex1);
    this.updatePole(edit, cable, pole2, partIndex2);
  }

  private updatePole(edit: Edit, cable: BlockData, pole: BlockData, partIndex: string) {
    const device = this.blockStore.getDecoration('devices', pole.id);

    edit.update<'devices'>(
      pole.id,
      {
        conduitConnections: [{ block: cable.id, thisPart: partIndex }],
        partDetails: {
          [partIndex]: {
            ...pole.partDetails[partIndex],
            isConnected: true,
          } as BlockPartLookupData,
        },
      },
      'devices',
      {
        pins: {
          ...device.pins,
          [partIndex]: {
            wires: [cable.id],
            connectedDevices: [device.id],
          },
        },
      },
    );
  }

  private getPositions(pole1: BlockData, pole2: BlockData, partIndex1: string, partIndex2: string) {
    const mesh1 = this.scene.getObj3d(pole1.id);
    const mesh2 = this.scene.getObj3d(pole2.id);

    const pinName1 = partIndex1;
    const pinName2 = partIndex2;

    const pinMesh1 = new MeshWrapper(mesh1).findByName(pinName1);
    const pinMesh2 = new MeshWrapper(mesh2).findByName(pinName2);
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
