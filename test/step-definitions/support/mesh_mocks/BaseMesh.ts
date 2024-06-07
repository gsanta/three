import Block from '@/client/editor/types/Block';
import { Vector3 } from 'three';
import AbstractMesh from './AbstractMesh';
import SceneStore from '@/client/editor/components/scene/SceneStore';

class BaseMesh extends AbstractMesh {
  constructor(block: Block, sceneStore: SceneStore, name?: string) {
    super(name);
    this.block = block;
    this.name = name;
    this.userData = {
      modelId: block.id,
    };
    this.sceneStore = sceneStore;
  }

  getWorldPosition(vec3: Vector3) {
    if (this.block.parent) {
      this.sceneStore.getObj3d(this.block.parent).getWorldPosition(vec3);
    }
    vec3.x += this.block.position[0];
    vec3.y += this.block.position[1];
    vec3.z += this.block.position[2];
  }

  userData: {
    modelId: string;
  };

  private block: Block;

  private sceneStore: SceneStore;
}

export default BaseMesh;
