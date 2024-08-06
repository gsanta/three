import { Given, Then } from '@cucumber/cucumber';
import ExtendedWorld from './ExtendedWorld';
import assert from 'assert';
import isPositionCloseTo from './helpers/isPositionCloseTo';
import { Pins } from '@/client/editor/types/block/Device';
import { checkBlockExists, checkDecorationExists, checkPartIndexExists, checkPosition } from './helpers/checks';
import Cable, { CablePoint } from '@/client/editor/types/block/Cable';
import MeshUtils from '@/client/editor/utils/MeshUtils';
import { Vector3 } from 'three';
import VectorUtils from '@/client/editor/utils/vectorUtils';
import AddWirePoints from '@/client/editor/use_cases/wiring/AddWirePoints';
import { waitForMeshCountChange } from './helpers/waitFor';

type CablePointHash = {
  WORLD_POS: string;
  BLOCK: string;
  PART: string;
};

Given(
  'I have a cable for house {string} with cable id {string}:',
  async function (this: ExtendedWorld, houseId: string, cableId: string, table: any) {
    const data = table.hashes() as CablePointHash[];
    this.env.sceneService.setUuid(cableId);

    const rootBlockId = houseId;
    const rootMesh = this.env.sceneStore.getObj3d(rootBlockId || '');
    const baseMesh = MeshUtils.findByName(rootMesh, 'root');
    const basePos = new Vector3();
    baseMesh.getWorldPosition(basePos);

    const points: CablePoint[] = [];

    data.forEach((row) => {
      const absolutePos = checkPosition.call(this, row.WORLD_POS);

      const pos = VectorUtils.sub(absolutePos, basePos.toArray());

      const partIndex = checkPartIndexExists.call(this, row.BLOCK, row.PART);

      points.push({
        position: pos,
        blockId: row.BLOCK,
        partIndex,
      });
    });

    const addWirePoints = new AddWirePoints(this.env.blockStore, this.env.services.factory, this.env.update);
    addWirePoints.add(this.env.blockStore.getBlock(rootBlockId), points);
    await waitForMeshCountChange(1, this);
  },
);

Then(
  'cable for block {string} and pin {string} ends at position {string}',
  function (this: ExtendedWorld, blockId: string, pin: string, position: string) {
    const [x, y, z] = checkPosition.call(this, position);
    const cables = Object.values(this.env.blockStore.getDecorations('cables'));

    const realBlockId = blockId === 'examined' ? this.env.testScene.storedBlockId || '' : blockId;

    const cable = cables.find(
      (currCable) =>
        (currCable?.end1?.device === realBlockId && currCable.end1.pin === pin) ||
        (currCable?.end2?.device === realBlockId && currCable.end2.pin === pin),
    );

    if (!cable) {
      throw new Error(`Cable for block ${realBlockId} in pin ${pin} not found.`);
    }

    const point = cable.end1?.device === realBlockId ? cable.points[0] : cable.points[cable.points.length - 1];

    if (!point) {
      throw new Error("Shouldn't happen");
    }

    const isClose = isPositionCloseTo([x, y, z], point.position);

    assert.ok(isClose, `Expected (${x}, ${y}, ${z}) to be close to (${point.position.join(', ')})`);
  },
);

Then('cable {string} ends at position {string}', function (this: ExtendedWorld, blockId: string, posStr: string) {
  const cable = checkDecorationExists.call(this, 'cables', blockId) as Cable;
  const [x, y, z] = checkPosition.call(this, posStr);

  const isClose1 = cable.points[0] ? isPositionCloseTo([x, y, z], cable.points[0].position) : false;
  const isClose2 = cable.points[1] ? isPositionCloseTo([x, y, z], cable.points[1].position) : false;

  assert.ok(
    isClose1 || isClose2,
    `Expected cable to end at (${x}, ${y}, ${z}), but points are (${cable.points.map((point) => point.position).join(',')})})`,
  );
});

Then('pin {string} of block {string} is empty', function (this: ExtendedWorld, pin: string, blockId: string) {
  const realBlockId = blockId === 'examined' ? this.env.testScene.storedBlockId || '' : blockId;

  const pole = this.env.blockStore.getDecorations('devices')[realBlockId];

  assert.equal(pole?.pins[pin as Pins]?.wires.length, 0);
});

Then('Points for cable {string} are:', function (this: ExtendedWorld, cableId: string, table: any) {
  const data = table.hashes() as CablePointHash[];
  const cable = checkDecorationExists.call(this, 'cables', cableId) as Cable;
  const cableBlock = checkBlockExists.call(this, cableId);

  const rootBlockId = cableBlock.parentConnection?.block;
  const rootMesh = this.env.sceneStore.getObj3d(rootBlockId || '');
  const baseMesh = MeshUtils.findByName(rootMesh, 'root');
  const basePos = new Vector3();
  baseMesh.getWorldPosition(basePos);

  if (cable.points.length !== data.length) {
    throw new Error(`Points lengths is ${cable.points.length}, table length is ${data.length}`);
  }

  data.forEach((row, index) => {
    const absolutePos = checkPosition.call(this, row.WORLD_POS);

    if (cable.points.length - 1 < index) {
      throw new Error(`Points lengths is ${cable.points.length}, expected index is ${index}`);
    }

    const pos = VectorUtils.sub(absolutePos, basePos.toArray());
    const isClose = isPositionCloseTo(pos, cable.points[index].position);

    assert.ok(isClose);
    assert(row.BLOCK === cable.points[index].blockId);
  });
});
