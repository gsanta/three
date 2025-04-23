import { Object3D, Ray, Vector3 } from 'three';
import SceneStore from '../SceneStore';
import IntersectMesh, { BlockIntersection } from '../../../use_cases/IntersectMesh';
import SceneService from './SceneService';
import { v4 as uuidv4 } from 'uuid';
import BlockStore from '../../../stores/block/BlockStore';
import IntersectionOptions from './IntersectionOptions';

class SceneServiceImpl implements SceneService {
  constructor(blockStore: BlockStore, sceneStore: SceneStore) {
    this.intersect = new IntersectMesh(blockStore, sceneStore);
    this.sceneStore = sceneStore;
  }

  worldToScreen(object: Object3D) {
    const canvas = this.sceneStore.getCanvasElement();
    const camera = this.sceneStore.getCamera();

    const canvasWidth = canvas.getBoundingClientRect().width;
    const canvasHeight = canvas.getBoundingClientRect().height;

    let pos = new Vector3();
    pos = pos.setFromMatrixPosition(object.matrixWorld);
    pos.project(camera);

    const widthHalf = canvasWidth / 2;
    const heightHalf = canvasHeight / 2;

    pos.x = pos.x * widthHalf + widthHalf;
    pos.y = -(pos.y * heightHalf) + heightHalf;
    pos.z = 0;

    console.log(pos);

    return pos;
  }

  uuid() {
    return uuidv4();
  }

  intersection(
    meshes: Object3D[],
    clientX: number,
    clientY: number,
    options?: IntersectionOptions,
  ): [BlockIntersection[], Ray];
  intersection(
    blocks: string[],
    clientX: number,
    clientY: number,
    options?: IntersectionOptions,
  ): [BlockIntersection[], Ray];
  intersection(
    blocksOrMeshes: string[] | Object3D[],
    clientX: number,
    clientY: number,
    options?: IntersectionOptions,
  ): [BlockIntersection[], Ray] {
    if (!blocksOrMeshes.length || typeof blocksOrMeshes[0] === 'string') {
      return this.intersect.calculateForBlock(blocksOrMeshes as string[], clientX, clientY, options);
    } else {
      return this.intersect.calculateForMesh(blocksOrMeshes as Object3D[], clientX, clientY, options);
    }
  }

  private intersect: IntersectMesh;

  private sceneStore: SceneStore;
}

export default SceneServiceImpl;
