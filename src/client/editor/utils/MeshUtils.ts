import { Mesh, Object3D } from 'three';

const findByNameRecursive = (mesh: Object3D, name: string): Object3D | undefined => {
  if (mesh.name === name) {
    return mesh;
  }

  for (const childMesh of mesh.children) {
    const found = findByNameRecursive(childMesh as Mesh, name);

    if (found) {
      return found;
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

class MeshUtils {
  static findByName(mesh: Object3D, name?: string): Object3D {
    if (!name) {
      throw new Error(`Name is mandatory`);
    }

    const found = findByNameRecursive(mesh, name);

    if (!found) {
      throw new Error(`Mesh with name ${name} not found`);
    }

    return found;
  }

  static getLeafs(mesh: Object3D): Mesh[] {
    return findLeafsRecursive(mesh);
  }
}

export default MeshUtils;
