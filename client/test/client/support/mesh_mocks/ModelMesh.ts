import { Vector3 } from 'three';
import BaseMesh from './BaseMesh';
import ChildMesh from './ChildMesh';
import Block from '@/client/editor/types/Block';

class ModelMesh extends BaseMesh {
  constructor(block: Block) {
    super(block);

    this.children = block.parts.map(
      (part) =>
        new ChildMesh(this, part.name || '', new Vector3(part.position?.[0], part.position?.[1], part.position?.[2])),
    );
  }

  static relativeChildPositions = [new Vector3(-1, 2, 0), new Vector3(-0.5, 2, 0), new Vector3(0.5, 2, 0)];
}

export default ModelMesh;
