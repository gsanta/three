import { addMeshes } from '@/editor/services/scene/blocksSlice';
import CanvasContent from '@/editor/services/scene/ui/CanvasContent';
import { renderWithProviders } from '@/editor/test/testUtils';
import BlockCreator from '../service/BlockCreator';
import { getBlock } from '../utils/blockUtils';
import { initialBlockSettingsState } from '../blockSettingsSlice';
import { act } from '@react-three/test-renderer';
import { setSelectedTool } from '@/editor/services/tool/state/toolSlice';
import ToolName from '@/editor/services/tool/state/ToolName';
import { Ray, Vector3 } from 'three';

describe('when select tool is active', () => {
  describe('when clicking on a mesh', () => {
    it('gets selected', async () => {
      const { renderer, store } = await renderWithProviders(<CanvasContent />);

      const meshData = BlockCreator.create(getBlock(initialBlockSettingsState.blocks, 'box'), { position: [2, 0, 1] });

      await act(() => {
        store.dispatch(addMeshes([meshData]));
        return Promise.resolve();
      });

      const box = renderer.scene.findAllByProps({ name: 'box' })[0];

      await act(() => {
        store.dispatch(setSelectedTool(ToolName.Select));

        return Promise.resolve();
      });

      await renderer.fireEvent(box, 'pointerDown', { eventObject: box.instance });

      const pivot = renderer.scene.findAllByProps({ autoTransform: false });

      expect(store.getState().blocks.present.selectedBlockIds).toEqual([meshData.id]);

      await renderer.fireEvent(
        renderer.scene.children[0].children[0].children[0].children[0].children[0],
        'onPointerDown',
        {
          point: new Vector3(0, 0, 0),
          target: {
            setPointerCapture: () => {},
          },
        },
      );

      await renderer.fireEvent(
        renderer.scene.children[0].children[0].children[0].children[0].children[0],
        'onPointerMove',
        {
          ray: new Ray(),
        },
      );

      await renderer.fireEvent(
        renderer.scene.children[0].children[0].children[0].children[0].children[0],
        'onPointerUp',
        {
          target: {
            releasePointerCapture: () => {},
          },
        },
      );
    });
  });
});
