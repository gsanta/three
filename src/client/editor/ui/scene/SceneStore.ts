import { Camera, Group, Mesh, Object3D, Scene } from 'three';
import ToolService from '../../services/ToolService';
import { RootState } from '@react-three/fiber';
import { OrbitControls } from 'three-stdlib';

class SceneStore {
  constructor() {
    this.meshes = new Map();
    this.groups = new Map();
    this.obj3ds = new Map();
    this.objInstances = new Map();
  }

  addMesh(mesh: Mesh | null, instanceId: string) {
    if (!mesh) {
      throw new Error('Mesh is null');
    }
    const existingInstances = this.objInstances.get(mesh.userData.modelId);

    if (!existingInstances) {
      this.objInstances.set(mesh.userData.modelId, new Set());
    }

    this.meshes.set(mesh.userData.modelId, mesh);
    this.obj3ds.set(mesh.userData.modelId, mesh);
    this.objInstances.get(mesh.userData.modelId)?.add(instanceId);
  }

  addGroup(group: Group | null, instanceId: string) {
    if (!group) {
      throw new Error('Group is null');
    }

    const existingInstances = this.objInstances.get(group.userData.modelId);

    if (!existingInstances) {
      this.objInstances.set(group.userData.modelId, new Set());
    }

    this.groups.set(group.userData.modelId, group);
    this.obj3ds.set(group.userData.modelId, group);
    this.objInstances.get(group.userData.modelId)?.add(instanceId);
  }

  removeMeshOrGroup(modelId: string, instanceId: string) {
    if (!modelId) {
      throw new Error('ModelId is undefined');
    }

    // if (!this.meshes.get(modelId) && !this.groups.get(modelId)) {
    //   throw new Error('Mesh not found by modelId: ' + modelId);
    // }

    this.objInstances.get(modelId)?.delete(instanceId);

    if (this.objInstances.get(modelId)?.size === 0) {
      this.objInstances.delete(modelId);

      this.meshes.delete(modelId);
      this.groups.delete(modelId);
      this.obj3ds.delete(modelId);
    }
  }

  getMesh(modelId: string) {
    const mesh = this.meshes.get(modelId);

    if (!mesh) {
      throw new Error('Mesh not found');
    }

    return mesh;
  }

  getObj3d(modelId: string) {
    let mesh: Object3D | undefined = this.meshes.get(modelId);

    if (!mesh) {
      mesh = this.groups.get(modelId);
    }

    if (!mesh) {
      throw new Error(`Mesh not found with id ${modelId}`);
    }

    return mesh;
  }

  hasObj3d(modelId: string) {
    let mesh: Object3D | undefined = this.meshes.get(modelId);

    if (!mesh) {
      mesh = this.groups.get(modelId);
    }

    return Boolean(mesh);
  }

  getAllObj3d() {
    return this.obj3ds;
  }

  setOrbitControls(orbitControls: OrbitControls) {
    this.orbitControls = orbitControls;
  }

  getOrbitControls() {
    if (!this.orbitControls) {
      throw new Error('OrbitControls is not defined');
    }
    return this.orbitControls;
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

  clear() {
    this.meshes = new Map();
    this.groups = new Map();
    this.obj3ds = new Map();
    this.objInstances = new Map();
  }

  // TODO: this should be added in the constructor, but causes circular dep
  setToolService(toolService: ToolService) {
    this.toolService = toolService;
  }

  getCanvasState() {
    return this.canvasState;
  }

  setCanvasState(canvasState: RootState) {
    this.canvasState = canvasState;
  }

  private orbitControls?: OrbitControls;

  private canvasState?: RootState;

  private meshes: Map<string, Mesh>;

  private groups: Map<string, Group>;

  private obj3ds: Map<string, Object3D>;

  private objInstances: Map<string, Set<string>>;

  private camera: Camera | undefined;

  private canvasElement: HTMLCanvasElement | undefined;

  private scene: Scene | undefined;

  private toolService?: ToolService;
}

export default SceneStore;
