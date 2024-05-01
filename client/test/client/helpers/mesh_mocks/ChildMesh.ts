import { Vector3 } from 'three';
import BaseMesh from './BaseMesh';
import AbstractMesh from './AbstractMesh';

class ChildMesh extends AbstractMesh {
  constructor(parent: BaseMesh, name: string, relativePos: Vector3) {
    super(name);
    this.parent = parent;
    this.relativePos = relativePos;
  }

  getWorldPosition(vec3: Vector3) {
    this.parent.getWorldPosition(vec3);
    vec3.add(this.relativePos);
  }

  private parent: BaseMesh;

  private relativePos: Vector3;
}

export default ChildMesh;
