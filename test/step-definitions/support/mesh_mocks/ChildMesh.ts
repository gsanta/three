import { Vector3 } from 'three';
import BaseMesh from './BaseMesh';
import AbstractMesh from './AbstractMesh';
import BlockData from '@/client/editor/models/block/BlockData';
import Vector from '@/client/editor/models/math/Vector';

class ChildMesh extends AbstractMesh {
  position: Vector3;

  constructor(parent: BaseMesh, block: BlockData, name: string) {
    super(name);
    this.parent = parent;

    const pos = block.parts.find((part) => part.name === name)?.position || [0, 0, 0];
    this.position = new Vector3(pos[0], pos[1], pos[2]);
  }

  getWorldPosition(vec3: Vector3) {
    this.parent.getWorldPosition(vec3);

    const rotatedPartPosition = new Vector(this.position.toArray()).rotateY(this.parent.getRotation()[1]).get();

    vec3.add(new Vector3(...rotatedPartPosition));
  }

  private parent: BaseMesh;
}

export default ChildMesh;
