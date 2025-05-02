import { Mesh, Object3D, Vector3 } from 'three';
import Vector from './math/Vector';

const findByNameRecursiveOld = (mesh: Object3D, name: string): Object3D | undefined => {
  if (mesh.name === name) {
    return mesh;
  }

  for (const childMesh of mesh.children) {
    const found = findByNameRecursiveOld(childMesh as Mesh, name);

    if (found) {
      return found;
    }
  }

  return undefined;
};

const findByNameRecursive = (mesh: Object3D, name: string): MeshWrapper | undefined => {
  if (mesh.name === name) {
    return new MeshWrapper(mesh);
  }

  for (const childMesh of mesh.children) {
    const found = findByNameRecursiveOld(childMesh as Mesh, name);

    if (found) {
      return new MeshWrapper(found);
    }
  }

  return undefined;
};

const findLeafsRecursive = (obj: Object3D): Mesh[] => {
  if (!obj.children.length) {
    return [obj as Mesh];
  }

  const children: Mesh[] = [];

  for (const childObj of obj.children) {
    children.push(...findLeafsRecursive(childObj));
  }

  return children;
};

class MeshWrapper {
  constructor(mesh: Object3D) {
    this.mesh = mesh;
  }

  findByNameOld(name?: string): Object3D {
    if (!name) {
      throw new Error(`Name is mandatory`);
    }

    const found = findByNameRecursiveOld(this.mesh, name);

    if (!found) {
      throw new Error(`Mesh with name ${name} not found`);
    }

    return found;
  }

  findByName(name?: string): MeshWrapper {
    if (!name) {
      throw new Error(`Name is mandatory`);
    }

    const found = findByNameRecursive(this.mesh, name);

    if (!found) {
      throw new Error(`Mesh with name ${name} not found`);
    }

    return found;
  }

  getWorldPosition() {
    const pos1 = new Vector3();
    this.mesh.getWorldPosition(pos1);

    return new Vector(pos1.toArray());
  }

  getLeafs(): Mesh[] {
    return findLeafsRecursive(this.mesh);
  }

  get() {
    return this.mesh;
  }

  private mesh: Object3D;
}

export default MeshWrapper;
