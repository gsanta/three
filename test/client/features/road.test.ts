import { addBlockToSlot } from '../steps/add';
import { SimpleRoad } from './road.stories';

describe('Road', () => {
  describe('when snapping a road to an existing road', () => {
    it('is will be positioned to the exiting road', () => {
      SimpleRoad();

      const existingRoad = testEnv.testScene.getLastCreatedBlock();

      addBlockToSlot({ blockId: existingRoad.id, slotName: 'end-south', templateName: 'road-1' }, testEnv);
      const secondRoad = testEnv.testScene.getLastCreatedBlock();

      const roadTemplate = testEnv.blockStore.getTemplateByName('road-1');
      // const zPos = roadTemplate.

      expect(secondRoad.position).toBeCloseToPosition([5, 0.005, 4]);
    });
  });
});
