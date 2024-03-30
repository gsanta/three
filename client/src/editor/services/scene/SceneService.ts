import { Mesh } from 'three';

class SceneService {
  constructor() {
    this.meshes = new Map();
  }

  addMesh(mesh: Mesh | null) {
    if (!mesh) {
      throw new Error('Mesh is null');
    }
    this.meshes.set(mesh.userData.modelId, mesh);
  }

  removeMesh(modelId?: string) {
    if (!modelId) {
      throw new Error('ModelId is undefined');
    }

    if (!this.meshes.get(modelId)) {
      throw new Error('Mesh not found by modelId: ' + modelId);
    }

    this.meshes.delete(modelId);
  }

  private meshes: Map<string, Mesh>;
}

export default SceneService;
