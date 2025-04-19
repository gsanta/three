import MeshUtils from '@/client/editor/utils/MeshUtils';
import ExtendedWorld from '../ExtendedWorld';
import Num3 from '@/client/editor/models/Num3';
import { Vector3 } from 'three';
import BlockDecoration from '@/client/editor/models/BlockCategory';
import assert from 'assert';
import VectorUtils from '@/client/editor/utils/vectorUtils';

export function checkBlockExists(this: ExtendedWorld, blockId: string) {
  const realBlockId = blockId === 'examined' ? this.env.testScene.storedBlockId || '' : blockId;

  const block = this.env.blockStore.getBlock(realBlockId);

  if (!block) {
    throw new Error(`Block ${blockId} not found.`);
  }

  return block;
}

export function checkDecorationExists(this: ExtendedWorld, category: BlockDecoration, blockId: string) {
  const realBlockId = blockId === 'examined' ? this.env.testScene.storedBlockId || '' : blockId;

  const decortion = this.env.blockStore.getDecoration(category, realBlockId);

  if (!decortion) {
    throw new Error(`Decoration of type ${category} with id ${blockId} not found.`);
  }

  return decortion;
}

export function checkPartIndexExists(this: ExtendedWorld, blockId: string, partIndexOrName: string) {
  const block = checkBlockExists.call(this, blockId);

  if (partIndexOrName.startsWith('#')) {
    return partIndexOrName;
  }

  const entry = Object.entries(block.partDetails).find(([, val]) => val?.name === partIndexOrName);

  if (!entry?.[0]) {
    throw new Error(`Part with name ${partIndexOrName} not found for block ${blockId}`);
  }

  return entry?.[0];
}

export function checkBlockMeshExists(this: ExtendedWorld, blockId: string) {
  const block = checkBlockExists.call(this, blockId);

  const mesh = this.env.sceneStore.getObj3d(block.id);

  if (!mesh) {
    throw new Error(`Mesh for block ${blockId} not found.`);
  }

  return mesh;
}

export function checkPartMeshExists(this: ExtendedWorld, blockId: string, partIndex: string) {
  const mesh = checkBlockMeshExists.call(this, blockId);

  const partName = this.env.blockStore.getBlock(blockId).partDetails[partIndex]?.name;
  const partMesh = MeshUtils.findByName(mesh, partName);

  if (!partMesh) {
    throw new Error(`Mesh for part ${partIndex} of block ${blockId} not found.`);
  }

  return partMesh;
}

export function checkPosition(this: ExtendedWorld, position: string): Num3 {
  if (position === 'stored') {
    const pos = this.env.testScene.storedTestData.position as Vector3 | Num3;

    if (!pos) {
      throw new Error('No position is stored');
    }

    return 'toArray' in pos ? pos.toArray() : pos;
  }

  return position.split(',').map((coord) => Number(coord.trim())) as Num3;
}

export function checkPositionCloseTo(this: ExtendedWorld, position: string, actual: Num3) {
  const expected = checkPosition.call(this, position);

  const diff = VectorUtils.size(VectorUtils.sub(expected, actual));

  assert.ok(diff < 0.1);
}
