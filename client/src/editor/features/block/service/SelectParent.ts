import MeshData from '@/editor/types/MeshData';

class SelectParent {
  constructor(ids: string[], meshes: Record<string, MeshData>) {
    this.ids = ids;
    this.meshes = meshes;
  }

  execute() {
    const parents = new Set<string>();

    this.ids.forEach((id) => {
      const parent = this.meshes[id].parent;

      parents.add(parent || id);
    });

    return [...parents];
  }

  ids: string[];

  meshes: Record<string, MeshData>;
}

export default SelectParent;
