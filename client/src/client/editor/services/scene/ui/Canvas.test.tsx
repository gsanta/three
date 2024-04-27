// import App from './Canvas';
import CanvasContent from './CanvasContent';
import { findByModelId, renderWithProviders } from '@/client/editor/test/testUtils';
import BlockCreator from '@/client/editor/features/block/service/BlockCreator';
import { initialBlockSettingsState } from '@/client/editor/features/block/blockSettingsSlice';
import { getBlock } from '@/client/editor/features/block/utils/blockUtils';

describe('when meshes are grouped', () => {
  it('renders the correct hierarhcy', async () => {
    const box = getBlock(initialBlockSettingsState.blocks, 'box');
    const group = getBlock(initialBlockSettingsState.blocks, 'group');

    const child1 = BlockCreator.create(box);
    const child2 = BlockCreator.create(box);
    const child3 = BlockCreator.create(box);

    const parent1 = BlockCreator.create(group, { children: [child1.id, child2.id] });
    const parent2 = BlockCreator.create(group, { children: [child3.id] });

    const grandParent = BlockCreator.create(group, { children: [parent1.id, parent2.id] });

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
