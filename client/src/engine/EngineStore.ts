import { Engine, Scene } from 'babylonjs';

export interface EngineStore {
  engine: Engine | null;
  scene: Scene | null;
}

const engineStore: EngineStore = {
  engine: null,
  scene: null,
};

export default engineStore;
