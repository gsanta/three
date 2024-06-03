import MeshUtils from '@/client/editor/utils/MeshUtils';
import { Vector3 } from 'three';
import Block from '@/client/editor/types/Block';
import SceneStore from '@/client/editor/components/scene/SceneStore';
import TransactionService from '../../services/transaction/TransactionService';
import Num3 from '@/client/editor/types/Num3';
import FactoryService from '../../services/factory/FactoryService';
import { Pins } from '../../types/block/Pole';

class JoinPoles {
  constructor(scene: SceneStore, factory: FactoryService, update: TransactionService) {
    this.factory = factory;
    this.scene = scene;
    this.update = update;
  }

  join(pole1: Block, pole2: Block) {
    let pairs: [Pins, Pins][] = [];
    if (pole1.type === 'poles' && pole2.type === 'poles') {
      pairs = [
        ['pin1', 'pin1'],
        ['pin2', 'pin2'],
        ['pin3', 'pin3'],
      ];
    } else if (pole1.type === 'weather-heads' && pole2.type === 'poles') {
      pairs = [['pin1', 'pin4']];
    } else if (pole1.type === 'poles' && pole2.type === 'weather-heads') {
      pairs = [['pin4', 'pin1']];
    }
    pairs.forEach(([pinName1, pinName2]) => this.joinPins(pole1, pole2, pinName1, pinName2));
  }

  private joinPins(pole1: Block, pole2: Block, pinName1: Pins, pinName2: Pins) {
    const mesh1 = this.scene.getObj3d(pole1.id);
    const mesh2 = this.scene.getObj3d(pole2.id);
    const pinMesh1 = MeshUtils.findByName(mesh1, pinName1);
    const pinMesh2 = MeshUtils.findByName(mesh2, pinName2);

    const pos1 = new Vector3();
    pinMesh1.getWorldPosition(pos1);
    const pos2 = new Vector3();
    pinMesh2.getWorldPosition(pos2);

    const edit = this.update.getTransaction();

    this.factory.create(
      edit,
      'cable-1',
      { dependsOn: [pole1.id, pole2.id] },
      {
        cables: {
          points: [pos1, pos2].map((point) => [point.x, point.y, point.z]) as Num3[],
          end1: { pin: pinName1, device: pole1.id },
          end2: { pin: pinName2, device: pole2.id },
        },
      },
    );

    const cable = edit.getLastBlock();

    edit.update<'poles'>(
      pole1.id,
      {
        dependents: [cable.id],
      },
      {
        pins: {
          [pinName1]: {
            wires: [cable.id],
          },
        },
      },
    );

    edit.update<'poles'>(
      pole2.id,
      {
        dependents: [cable.id],
      },
      {
        pins: {
          [pinName2]: {
            wires: [cable.id],
          },
        },
      },
    );

    edit.commit();
  }

  private factory: FactoryService;

  private scene: SceneStore;

  private update: TransactionService;
}

export default JoinPoles;
