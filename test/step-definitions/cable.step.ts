import { Then } from '@cucumber/cucumber';
import ExtendedWorld from './ExtendedWorld';
import MeshUtils from '@/client/editor/utils/MeshUtils';
import { Vector3 } from 'three';
import assert from 'assert';
import isPositionCloseTo from './helpers/isPositionCloseTo';
import { Pins } from '@/client/editor/types/block/Pole';
import { checkPosition } from './helpers/checks';

Then(
  'cable for block {string} and pin {string} ends at position {string}',
  function (this: ExtendedWorld, blockId: string, pin: string, position: string) {
    const [x, y, z] = checkPosition.call(this, position);
    const cables = Object.values(this.env.blockStore.getDecorations('cables'));

    const realBlockId = blockId === 'examined' ? this.env.testScene.storedBlockId || '' : blockId;

    const cable = cables.find(
      (currCable) =>
        (currCable.end1?.device === realBlockId && currCable.end1.pin === pin) ||
        (currCable.end2?.device === realBlockId && currCable.end2.pin === pin),
    );

    if (!cable) {
      throw new Error(`Cable for block ${realBlockId} in pin ${pin} not found.`);
    }

    const blockMesh = this.env.sceneStore.getMesh(realBlockId);
    const actual = new Vector3();
    MeshUtils.findByName(blockMesh, pin).getWorldPosition(actual);

    const isClose = isPositionCloseTo([x, y, z], [actual.x, actual.y, actual.z]);

    assert.ok(isClose, `Expected (${x}, ${y}, ${z}) to be close to (${actual.x}, ${actual.y}, ${actual.z})`);
  },
);

Then('pin {string} of block {string} is empty', function (this: ExtendedWorld, pin: string, blockId: string) {
  const realBlockId = blockId === 'examined' ? this.env.testScene.storedBlockId || '' : blockId;

  const pole = this.env.blockStore.getDecorations('poles')[realBlockId];

  assert.equal(pole.pins[pin as Pins]?.wires.length, 0);
});
