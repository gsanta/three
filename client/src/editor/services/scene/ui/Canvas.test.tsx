// import App from './Canvas';
import CanvasContent from './CanvasContent';
import { findByModelId, renderWithProviders } from '@/editor/test/testUtils';
import MeshCreator from '@/editor/features/block/service/MeshCreator';
import { initialBlockState } from '@/editor/features/block/blockSlice';
import { getBlock } from '@/editor/features/block/utils/blockUtils';

describe('when meshes are grouped', () => {
  it('renders the correct hierarhcy', async () => {
    const box = getBlock(initialBlockState.blocks, 'box');
    const group = getBlock(initialBlockState.blocks, 'group');

    const child1 = MeshCreator.create(box);
    const child2 = MeshCreator.create(box);
    const child3 = MeshCreator.create(box);

    const parent1 = MeshCreator.create(group, { children: [child1.id, child2.id] });
    const parent2 = MeshCreator.create(group, { children: [child3.id] });

    const grandParent = MeshCreator.create(group, { children: [parent1.id, parent2.id] });

    const { renderer } = await renderWithProviders(<CanvasContent />, {
      preloadedState: {
        scene: {
          roots: [grandParent.id],
          meshes: {
            [child1.id]: child1,
            [child2.id]: child2,
            [child3.id]: child3,
            [parent1.id]: parent1,
            [parent2.id]: parent2,
            [grandParent.id]: grandParent,
          },
          selectedMeshIds: [],
        },
      },
    });

    const grandParentMesh = findByModelId(renderer.scene, grandParent.id, { name: 'group' });

    const parent1Mesh = findByModelId(grandParentMesh, parent1.id, { name: 'group' });
    const parent2Mesh = findByModelId(grandParentMesh, parent2.id, { name: 'group' });

    findByModelId(parent1Mesh, child1.id, { name: 'box' });
    findByModelId(parent1Mesh, child2.id, { name: 'box' });
    findByModelId(parent2Mesh, child3.id, { name: 'box' });
  });
});
