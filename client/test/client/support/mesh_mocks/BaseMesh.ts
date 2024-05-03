import Block from '@/client/editor/types/Block';
import { Vector3 } from 'three';
import AbstractMesh from './AbstractMesh';

class BaseMesh extends AbstractMesh {
  constructor(block: Block, name?: string) {
    super(name);
    this.block = block;
    this.name = name;
    this.userData = {
      modelId: block.id,
    };
  }

  getWorldPosition(vec3: Vector3) {
    vec3.x = this.block.position[0];
    vec3.y = this.block.position[1];
    vec3.z = this.block.position[2];
  }

  userData: {
    modelId: string;
  };

  private block: Block;
}

export default BaseMesh;
