import { Vector3 } from 'three';
import BaseMesh from './BaseMesh';
import ChildMesh from './ChildMesh';
import Block from '@/client/editor/types/Block';
import AbstractMesh from './AbstractMesh';

class PoleMesh extends BaseMesh {
  constructor(block: Block) {
    super(block);

    this.children = PoleMesh.relativeChildPositions.map((vec, index) => new ChildMesh(this, `pin${index + 1}`, vec));
  }

  static relativeChildPositions = [new Vector3(-1, 2, 0), new Vector3(-0.5, 2, 0), new Vector3(0.5, 2, 0)];
}

export default PoleMesh;
