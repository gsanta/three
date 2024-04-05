import { addMeshes } from '@/editor/services/scene/sceneSlice';
import CanvasContent from '@/editor/services/scene/ui/CanvasContent';
import { renderWithProviders } from '@/editor/test/testUtils';
import MeshCreator from '../service/MeshCreator';
import { getBlock } from '../utils/blockUtils';
import { initialBlockState } from '../blockSlice';
import { act } from '@react-three/test-renderer';
import { setSelectedTool } from '@/editor/services/tool/state/toolSlice';
import ToolName from '@/editor/services/tool/state/ToolName';
import { Ray, Vector3 } from 'three';

describe('when select tool is active', () => {
  describe('when clicking on a mesh', () => {
    it('gets selected', async () => {
      const { renderer, store } = await renderWithProviders(<CanvasContent />);

      const meshData = MeshCreator.create(getBlock(initialBlockState.blocks, 'box'), { position: [2, 0, 1] });

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

      expect(store.getState().scene.present.selectedMeshIds).toEqual([meshData.id]);

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
