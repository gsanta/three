import { Object3D, Vector3 } from 'three';
import { store } from '@/client/common/utils/store';
import { setSelectedTool, updateSelectTool } from '@/client/editor/stores/tool/toolSlice';
import ToolName from '@/client/editor/types/ToolName';
import { setSelectedGeometry } from '@/client/editor/stores/template/templateSlice';
import { eraseBlockById } from '../steps/erase';

describe('Add', () => {
  describe('when adding a box', () => {
    it('is created where the user clicks', () => {
      store.dispatch(setSelectedTool(ToolName.Add));

      testEnv.toolHelper.pointerMove({ point: new Vector3(0, 0.1, 5) });
      testEnv.toolHelper.pointerDown();

      expect(Object.keys(testEnv.blockStore.getBlocks())).toHaveLength(1);
      expect(Object.values(testEnv.blockStore.getBlocks())[0]).toMatchObject({
        geometry: 'model',
        name: 'box',
        position: [0, 0.1, 5],
        rotation: [0, 0, 0],
        scale: [1, 1, 1],
      });
    });
  });

  const addTemplate = (templateName: string) => {
    store.dispatch(setSelectedTool(ToolName.Add));
    store.dispatch(setSelectedGeometry(templateName));

    testEnv.toolHelper.pointerDown();
  };

  const addTemplateToSlot = (blockId: string, slotName: string, templateName: string) => {
    store.dispatch(setSelectedTool(ToolName.Select));
    store.dispatch(updateSelectTool({ templateName: templateName }));

    const mesh = testEnv.sceneStore.getObj3d(blockId);
    const childMesh = mesh.children.find((child) => child.name === slotName);

    testEnv.sceneService.setIntersection([{ object: childMesh as Object3D, distance: 1, point: new Vector3() }]);

    testEnv.toolHelper.pointerDown({ blockId });
    testEnv.tool.getAddTool().addToSlot();
  };

  describe('when adding Walls to a Building base', () => {
    it('puts the Walls into the correct slots', () => {
      addTemplate('building-base-1');

      const buildingBaseBlock = testEnv.testScene.getLastCreatedBlock();

      addTemplateToSlot(buildingBaseBlock.id, 'wall1', 'wall_new');

      const wall1Block = testEnv.testScene.getLastCreatedBlock();

      addTemplateToSlot(buildingBaseBlock.id, 'wall2', 'wall_new');

      const wall2Block = testEnv.testScene.getLastCreatedBlock();

      expect(wall1Block).toMatchObject({
        parent: buildingBaseBlock.id,
        slotTarget: {
          blockId: buildingBaseBlock.id,
          slotName: 'wall1',
        },
      });

      expect(wall2Block).toMatchObject({
        parent: buildingBaseBlock.id,
        slotTarget: {
          blockId: buildingBaseBlock.id,
          slotName: 'wall2',
        },
      });

      expect(buildingBaseBlock.id).toMatchBlock({
        children: [wall1Block.id, wall2Block.id],
        slotSources: [
          {
            blockId: wall1Block.id,
            slotName: 'wall1',
          },
          {
            blockId: wall2Block.id,
            slotName: 'wall2',
          },
        ],
      });
    });

    describe('when removing Walls from a Building base', () => {
      it('removes it from the corresponding slot', () => {
        addTemplate('building-base-1');

        const buildingBaseBlock = testEnv.testScene.getLastCreatedBlock();

        addTemplateToSlot(buildingBaseBlock.id, 'wall1', 'wall_new');

        const wall1Block = testEnv.testScene.getLastCreatedBlock();

        addTemplateToSlot(buildingBaseBlock.id, 'wall2', 'wall_new');

        const wall2Block = testEnv.testScene.getLastCreatedBlock();

        eraseBlockById({ blockId: wall1Block.id }, testEnv);

        expect(buildingBaseBlock.id).toMatchBlock({
          children: [wall2Block.id],
          slotSources: [
            {
              blockId: wall2Block.id,
              slotName: 'wall2',
            },
          ],
        });

        eraseBlockById({ blockId: wall2Block.id }, testEnv);

        expect(buildingBaseBlock.id).toMatchBlock({
          children: [],
          slotSources: [],
        });
      });
    });
  });

  it('can add a pole', () => {
    store.dispatch(setSelectedTool(ToolName.Add));
    store.dispatch(setSelectedGeometry('pole'));

    testEnv.toolHelper.pointerMove({ point: new Vector3(0, 0.1, 5) });
    testEnv.toolHelper.pointerDown();

    expect(Object.keys(testEnv.blockStore.getBlocks())).toHaveLength(1);
    expect(Object.values(testEnv.blockStore.getBlocks())[0]).toMatchObject({
      geometry: 'model',
      name: 'pole',
      position: [0, 0.1, 5],
      rotation: [0, 0, 0],
      scale: [1, 1, 1],
    });

    expect(Object.keys(testEnv.blockStore.getDecorations('poles'))).toHaveLength(1);
    expect(Object.values(testEnv.blockStore.getDecorations('poles'))[0]).toMatchObject({
      category: 'poles',
      pins: {
        pin1: [],
        pin2: [],
        pin3: [],
      },
    });
  });
});
