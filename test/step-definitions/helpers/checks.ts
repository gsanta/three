import MeshUtils from '@/client/editor/utils/MeshUtils';
import ExtendedWorld from '../ExtendedWorld';
import Num3 from '@/client/editor/types/Num3';
import { Vector3 } from 'three';

export function checkBlockExists(this: ExtendedWorld, blockId: string) {
  const block = this.env.blockStore.getBlock(blockId);

  if (!block) {
    throw new Error(`Block ${blockId} not found.`);
  }

  return block;
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

  const partMesh = MeshUtils.findByName(mesh, partIndex);

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
