import { Then } from '@cucumber/cucumber';
import ExtendedWorld from './ExtendedWorld';
import assert from 'assert';
import isPositionCloseTo from './helpers/isPositionCloseTo';
import { Pins } from '@/client/editor/types/block/Device';
import { checkDecorationExists, checkPosition } from './helpers/checks';
import Cable from '@/client/editor/types/block/Cable';

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

    const isClose = isPositionCloseTo([x, y, z], point);

    assert.ok(isClose, `Expected (${x}, ${y}, ${z}) to be close to (${point.join(', ')})`);
  },
);

Then('cable {string} ends at position {string}', function (this: ExtendedWorld, blockId: string, posStr: string) {
  const cable = checkDecorationExists.call(this, 'cables', blockId) as Cable;
  const [x, y, z] = checkPosition.call(this, posStr);

  const isClose1 = cable.points[0] ? isPositionCloseTo([x, y, z], cable.points[0]) : false;
  const isClose2 = cable.points[1] ? isPositionCloseTo([x, y, z], cable.points[1]) : false;

  assert.ok(
    isClose1 || isClose2,
    `Expected cable to end at (${x}, ${y}, ${z}), but points are (${cable.points.join(',')})})`,
  );
});

Then('pin {string} of block {string} is empty', function (this: ExtendedWorld, pin: string, blockId: string) {
  const realBlockId = blockId === 'examined' ? this.env.testScene.storedBlockId || '' : blockId;

  const pole = this.env.blockStore.getDecorations('devices')[realBlockId];

  assert.equal(pole?.pins[pin as Pins]?.wires.length, 0);
});
