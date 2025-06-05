import MeshWrapper from '@/client/editor/models/MeshWrapper';
import ExtendedWorld from '../ExtendedWorld';
import Num3 from '@/client/editor/models/math/Num3';
import { Vector3 } from 'three';
import assert from 'assert';
import Vector from '@/client/editor/models/math/Vector';
import { BlockCategoryName } from '@/client/editor/models/block/BlockCategoryName';
import Grid from '@/client/editor/models/Grid';

export function checkBlockExists(this: ExtendedWorld, blockId: string) {
  const realBlockId = blockId === 'examined' ? this.env?.testScene.storedBlockId || '' : blockId;

  const block = this.env?.editorContext.blockStore.getBlock(realBlockId);

  if (!block) {
    throw new Error(`Block ${blockId} not found.`);
  }

  return block;
}

export function checkDecorationExists(this: ExtendedWorld, category: BlockCategoryName, blockId: string) {
  const realBlockId = blockId === 'examined' ? this.env?.testScene.storedBlockId || '' : blockId;

  const decortion = this.env?.editorContext.blockStore.getDecoration(category, realBlockId);

  if (!decortion) {
    throw new Error(`Decoration of type ${category} with id ${blockId} not found.`);
  }

  return decortion;
}

export function checkPartIndexExists(this: ExtendedWorld, blockId: string, partName: string) {
  const block = checkBlockExists.call(this, blockId);

  const entry = block.partDetails[partName];

  if (!entry) {
    throw new Error(`Part with name ${partName} not found for block ${blockId}`);
  }

  return entry;
}

export function checkBlockMeshExists(this: ExtendedWorld, blockId: string) {
  const block = checkBlockExists.call(this, blockId);

  const mesh = this.getEnv().editorContext.sceneStore.getObj3d(block.id);

  if (!mesh) {
    throw new Error(`Mesh for block ${blockId} not found.`);
  }

  return mesh;
}

export function checkPosition(this: ExtendedWorld, position: string): Num3 {
  if (position === 'stored') {
    const pos = this.getEnv().testScene.storedTestData.position as Vector3 | Num3;

    if (!pos) {
      throw new Error('No position is stored');
    }

    return 'toArray' in pos ? pos.toArray() : pos;
  } else if (position.indexOf(',') !== -1) {
    return position.split(',').map((coord) => Number(coord.trim())) as Num3;
  } /* pole-1-1:Pin4->transformer-1:Join */ else if (position.indexOf('->') !== -1) {
    const [source, target] = position.split('->'); // [pole-1-1:Pin4, transformer-1:Join]
    const [sourceBlockId, sourcePart] = source.split(':');
    const [targetBlockId] = target.split(':');

    const sourceBlock = this.getEnv().editorContext.blockStore.getBlock(sourceBlockId);

    const mesh = this.getEnv().editorContext.sceneStore.getObj3d(sourceBlockId);

    const targetBlock = this.getEnv().editorContext.blockStore.getBlock(targetBlockId);

    const meshPos = new MeshWrapper(mesh).findByNameOld(sourcePart).position.toArray() as Num3;
    const rotateMeshPos = new Vector(meshPos).rotateY(sourceBlock.rotation[1]).get();

    if (targetBlock.parentConnection?.block === sourceBlockId) {
      return rotateMeshPos;
    } else {
      return new Vector(rotateMeshPos).add(new Vector(sourceBlock.position)).get();
    }
  } /* pole-1-1:Pin4 */ else if (position.indexOf(':')) {
    const [targetBlockId, targetPart] = position.split(':');

    const targetBlock = this.getEnv().editorContext.blockStore.getBlock(targetBlockId);

    const mesh = this.getEnv().editorContext.sceneStore.getObj3d(targetBlockId);

    const meshPos = new Vector3();
    new MeshWrapper(mesh).findByNameOld(targetPart).getWorldPosition(meshPos);
    const rotateMeshPos = new Vector(meshPos.toArray()).rotateY(targetBlock.rotation[1]).get();

    return rotateMeshPos;
  }

  throw new Error('should not reach this point');
}

export function checkCableEnd(this: ExtendedWorld, end: string): Num3 {
  if (end.startsWith('grid')) {
    const [x, y] = end.split(':')[1].split(',').map(Number);

    const grid = new Grid(this.getEnv().editorContext.gridStore);
    const [worldX, worldZ] = grid.gridToWorldPos(grid.gridPositionToGridIndex(x, y));
    return [worldX, 0, worldZ] as Num3;
  } else if (end.startsWith('block')) {
    const blockAndPart = end.split(':')[1];
    let blockId = blockAndPart;
    let partName = '';
    if (blockAndPart.indexOf(',') !== -1) {
      blockId = blockAndPart.split(',')[0];
      partName = blockAndPart.split(',')[1];
    }

    if (!partName) {
      return this.getEnv().editorContext.blockStore.getBlock(blockId).position;
    } else {
      const mesh = this.getEnv().editorContext.sceneStore.getObj3d(blockId);

      return new MeshWrapper(mesh).findByName(partName).getWorldPosition().get();
    }
  } else {
    throw new Error(`Unknown cable end format: ${end}`);
  }
}

export function checkGridPosition(this: ExtendedWorld, position: string): [number, number] {
  const gridPositions = position.split(',').map((pos) => Number(pos));

  return gridPositions as [number, number];
}

export function checkPositionCloseTo(this: ExtendedWorld, position: string | Num3, actual: Num3) {
  const expected = typeof position === 'string' ? checkPosition.call(this, position) : position;

  const diff = new Vector(expected).sub(new Vector(actual)).size();

  assert.ok(diff < 0.1, `Expected number (${expected.join(', ')}) to be close to (${actual.join(', ')})`);
}
