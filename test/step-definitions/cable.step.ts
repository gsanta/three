import { Then } from '@cucumber/cucumber';
import ExtendedWorld from './ExtendedWorld';
import assert from 'assert';
import isPositionCloseTo from './helpers/isPositionCloseTo';
import Device, { Pins } from '@/client/editor/models/block/categories/Device';
import { checkDecorationExists, checkPosition } from './helpers/checks';
import Cable from '@/client/editor/models/block/categories/Cable';

Then(
  'cable for block {string} and pin {string} ends at position {string}',
  function (this: ExtendedWorld, blockId: string, pin: string, position: string) {
    const [x, y, z] = checkPosition.call(this, position);
    const cables = Object.values(this.env?.editorContext.blockStore.getDecorations('cables') || {}) as Cable[];

    const realBlockId = blockId === 'examined' ? this.env?.testScene.storedBlockId || '' : blockId;

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

type BlockHash = {
  CABLE: string;
  PARENT: string;
  POSITION: string;
};

Then('I have cables with properties', function (this: ExtendedWorld, table: { hashes(): BlockHash[] }) {
  const rows = table.hashes();

  rows.forEach((row) => {
    const cables = Object.values(this.env?.editorContext.blockStore.getDecorations('cables') || {});

    const cable = cables.find((currCable) => currCable?.id === row.CABLE) as Cable;

    if (!cable) {
      assert.fail(`Cable not found with id id ${row.CABLE}`);
    }

    const index = cable?.points.findIndex((point) => row.PARENT === point.blockId);

    if (index === -1) {
      assert.fail(`Cable does not have a parent with id ${row.PARENT}`);
    }

    const [x, y, z] = checkPosition.call(this, row.POSITION);
    const isClose = isPositionCloseTo([x, y, z], cable?.points[index].position);

    assert.ok(isClose, `Expected (${x}, ${y}, ${z}) to be close to (${cable?.points[index].position.join(', ')})`);
  });
});

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
  const realBlockId = blockId === 'examined' ? this.env?.testScene.storedBlockId || '' : blockId;

  const pole = this.env?.editorContext.blockStore.getDecorations('devices')[realBlockId] as Device;

  assert.equal(pole?.pins[pin as Pins]?.wires.length, 0);
});
