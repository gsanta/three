import Block from '@/client/editor/types/Block';

class Ungroup {
  constructor(ids: string[], roots: string[], meshes: Record<string, Block>) {
    this.ids = ids;
    this.meshes = { ...meshes };
    this.roots = [...roots];
  }

  execute() {
    this.ungroup();
    this.updateRoots();
    this.updateMeshes();

    return {
      roots: this.roots,
      meshes: this.meshes,
      ungroupedIds: this.ungroupedIds,
    };
  }

  private ungroup() {
    this.ids.forEach((meshId) => {
      if (this.meshes[meshId].name === 'group') {
        this.ungroupedIds.push(...this.meshes[meshId].children);
        this.groupsToRemove.push(meshId);
      } else {
        this.ungroupedIds.push(meshId);
      }
    });

    this.ungroupedIds.forEach((id) => (this.meshes[id] = { ...this.meshes[id], parent: undefined }));
  }

  private updateRoots() {
    this.roots.push(...this.ungroupedIds);
    this.roots = [...new Set(this.roots)];
    this.roots = this.roots.filter((root) => !this.groupsToRemove.includes(root));
  }

  private updateMeshes() {
    const newMeshes = { ...this.meshes };

    this.groupsToRemove.map((group) => delete newMeshes[group]);
  }

  private ids: string[];

  private meshes: Record<string, Block>;

  private roots: string[];

  ungroupedIds: string[] = [];

  groupsToRemove: string[] = [];
}

export default Ungroup;
