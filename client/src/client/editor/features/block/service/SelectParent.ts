import Block from '@/client/editor/types/Block';

class SelectParent {
  constructor(ids: string[], meshes: Record<string, Block>) {
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

  meshes: Record<string, Block>;
}

export default SelectParent;
