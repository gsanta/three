import BlockData from '../../models/block/BlockData';
import BlockPartGeometryData from '../../models/block/part/BlockPartGeometryData';
import BlockPartLookupData, { BlockPartRole } from '../../models/block/part/BlockPartLookupData';
import Vector from '../../models/math/Vector';
import MeshWrapper from '../../models/MeshWrapper';
import SceneStore from '../../ui/scene/SceneStore';

type Filter = {
  role?: BlockPartRole;
};

class FindNearestPart {
  constructor(sceneStore: SceneStore) {
    this.sceneStore = sceneStore;
  }

  find(position: Vector, block: BlockData, filter: Filter) {
    const candidates = block.parts.filter((partData) => {
      if (!this.checkRole(filter, block.partDetails[partData.name])) {
        return false;
      }

      return true;
    });

    const { closestPart } = candidates.reduce<{ closestPart?: BlockPartGeometryData; distance: number }>(
      (closest, part) => {
        const partWorldPos = new MeshWrapper(this.sceneStore.getObj3d(block.id))
          .findByName(part.name)
          .getWorldPosition();

        const newDistance = position.distance(partWorldPos);
        if (closest.distance === -1 || closest.distance > newDistance) {
          return {
            closestPart: part,
            distance: newDistance,
          };
        }

        return closest;
      },
      {
        closestPart: undefined,
        distance: -1,
      },
    );

    return closestPart;
  }

  private checkRole(filter: Filter, part?: BlockPartLookupData) {
    if (!filter.role) {
      return true;
    }

    return part?.roles?.includes(filter.role);
  }

  private sceneStore: SceneStore;
}

export default FindNearestPart;
