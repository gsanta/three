import { Camera, Group, Mesh, Scene } from 'three';

class SceneStore {
  constructor() {
    this.meshes = new Map();
    this.groups = new Map();
  }

  addMesh(mesh: Mesh | null) {
    if (!mesh) {
      throw new Error('Mesh is null');
    }
    this.meshes.set(mesh.userData.modelId, mesh);
  }

  addGroup(group: Group | null) {
    if (!group) {
      throw new Error('Group is null');
    }
    this.groups.set(group.userData.modelId, group);
  }

  removeMeshOrGroup(modelId?: string) {
    if (!modelId) {
      throw new Error('ModelId is undefined');
    }

    if (!this.meshes.get(modelId) && !this.groups.get(modelId)) {
      throw new Error('Mesh not found by modelId: ' + modelId);
    }

    this.meshes.delete(modelId);
    this.groups.delete(modelId);
  }

  getMesh(modelId: string) {
    const mesh = this.meshes.get(modelId);

    if (!mesh) {
      throw new Error('Mesh not found');
    }

    return mesh;
  }

  setCamera(camera: Camera) {
    this.camera = camera;
  }

  getCamera(): Camera {
    if (!this.camera) {
      throw new Error('Camera is not defined');
    }
    return this.camera;
  }

  setCanvasElement(canvas: HTMLCanvasElement) {
    this.canvasElement = canvas;
  }

  getCanvasElement() {
    if (!this.canvasElement) {
      throw new Error('Canvas is not defined');
    }
    return this.canvasElement;
  }

  setScene(scene: Scene) {
    this.scene = scene;
  }

  getScene() {
    if (!this.scene) {
      throw new Error('Scene is not defined');
    }
    return this.scene;
  }

  private meshes: Map<string, Mesh>;

  private groups: Map<string, Group>;

  private camera: Camera | undefined;

  private canvasElement: HTMLCanvasElement | undefined;

  private scene: Scene | undefined;
}

export default SceneStore;
