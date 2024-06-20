import { Vector3 } from 'three';
import BaseMesh from './BaseMesh';
import AbstractMesh from './AbstractMesh';
import Block from '@/client/editor/types/Block';

class ChildMesh extends AbstractMesh {
  position: Vector3;

  constructor(parent: BaseMesh, block: Block, index: string) {
    super(block.partDetails[index]?.name);
    this.parent = parent;

    const pos = block.parts.find((part) => part.index === index)?.position || [0, 0, 0];
    this.position = new Vector3(pos[0], pos[1], pos[2]);
  }

  getWorldPosition(vec3: Vector3) {
    this.parent.getWorldPosition(vec3);
    vec3.add(this.position);
  }

  private parent: BaseMesh;
}

export default ChildMesh;
