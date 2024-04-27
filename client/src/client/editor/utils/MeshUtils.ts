import { Mesh } from 'three';

const findByNameRecursive = (mesh: Mesh, name: string): Mesh | undefined => {
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

class MeshUtils {
  static findByName(mesh: Mesh, name: string): Mesh {
    const found = findByNameRecursive(mesh, name);

    if (!found) {
      throw new Error(`Mesh with name ${name} not found`);
    }

    return found;
  }
}

export default MeshUtils;
