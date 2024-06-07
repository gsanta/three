import { When } from '@cucumber/cucumber';
import ExtendedWorld from './ExtendedWorld';
import { checkPartMeshExists } from './helpers/checks';
import { Vector3 } from 'three';

When(
  'I store world position for part {string} of block {string}',
  function (this: ExtendedWorld, partIndex: string, blockId: string) {
    const partMesh = checkPartMeshExists.call(this, blockId, partIndex);

    const position = new Vector3();
    partMesh.getWorldPosition(position);

    this.env.testScene.storedTestData.position = position;
  },
);
