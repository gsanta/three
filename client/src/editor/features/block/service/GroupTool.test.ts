import { Store, setupStore } from '@/common/utils/store';
import GroupTool from './GroupTool';
import { createStoreState } from '@/editor/test/testUtils';
import BlockCreator from './BlockCreator';
import parseBlocks from '../utils/parseBlocks';
import blocksJson from '@/editor/utils/blocks.json';
import { getBlock } from '../utils/blockUtils';

const blocks = parseBlocks(blocksJson as unknown as Parameters<typeof parseBlocks>[0]);

describe('GroupTool', () => {
  let store: Store;

  beforeEach(() => {
    const mesh1 = BlockCreator.create(getBlock(blocks, 'box'));
    const mesh2 = BlockCreator.create(getBlock(blocks, 'box'));

    store = setupStore(
      createStoreState({
        scene: {
          meshes: {
            [mesh1.id]: mesh1,
            [mesh2.id]: mesh2,
          },
          selectedMeshIds: [mesh1.id, mesh2.id],
          roots: [mesh1.id, mesh2.id],
        },
      }),
    );
  });

  describe('when grouping', () => {
    it('groups', () => {
      const groupTool = new GroupTool(store);

      const children = store.getState().blocks.present.rootBlocksIds;

      groupTool.group();

      const { blocks: meshes, rootBlocksIds: roots } = store.getState().blocks.present;

      expect(roots).toHaveLength(1);
      const parent = roots[0];

      expect(meshes[parent].children).toEqual(children);
      children.forEach((child) => expect(meshes[child].parent).toBe(parent));

      [parent, ...children].forEach((mesh) => expect(meshes[mesh]).toBeDefined());
    });
  });
});
