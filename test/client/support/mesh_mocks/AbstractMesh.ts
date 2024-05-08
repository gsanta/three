import { Vector3 } from 'three';

abstract class AbstractMesh {
  constructor(name?: string) {
    this.name = name;

    this.children = [];
  }

  abstract getWorldPosition(vec3: Vector3): void;

  children: AbstractMesh[];

  name?: string;
}

export default AbstractMesh;
