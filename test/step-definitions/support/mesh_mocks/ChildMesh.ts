import { Vector3 } from 'three';
import BaseMesh from './BaseMesh';
import AbstractMesh from './AbstractMesh';
import BlockType from '@/client/editor/models/BlockType';

class ChildMesh extends AbstractMesh {
  position: Vector3;

  constructor(parent: BaseMesh, block: BlockType, name: string) {
    super(name);
    this.parent = parent;

    const pos = block.parts.find((part) => part.name === name)?.position || [0, 0, 0];
    this.position = new Vector3(pos[0], pos[1], pos[2]);
  }

  getWorldPosition(vec3: Vector3) {
    this.parent.getWorldPosition(vec3);
    vec3.add(this.position);
  }

  private parent: BaseMesh;
}

export default ChildMesh;
