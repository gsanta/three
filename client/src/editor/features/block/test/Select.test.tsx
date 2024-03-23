import { addMesh } from '@/editor/services/scene/sceneSlice';
import CanvasContent from '@/editor/services/scene/ui/CanvasContent';
import { renderWithProviders } from '@/editor/test/testUtils';
import MeshCreator from '../service/MeshCreator';
import { getBlock } from '../utils/blockUtils';
import { initialBlockState } from '../blockSlice';
import { Vector3 } from 'three';
import { act } from '@react-three/test-renderer';
import { setSelectedTool } from '@/editor/services/tool/state/toolSlice';
import ToolName from '@/editor/services/tool/state/ToolName';

describe('when select tool is active', () => {
  describe('when clicking on a mesh', () => {
    it('gets selected', async () => {
      const { renderer, store } = await renderWithProviders(<CanvasContent />);

      const meshData = MeshCreator.create(getBlock(initialBlockState.blocks, 'box'), new Vector3(2, 0, 1));

      await act(() => {
        store.dispatch(addMesh(meshData));
        return Promise.resolve();
      });

      const box = renderer.scene.findAllByProps({ name: 'box' })[0];

      await act(() => {
        store.dispatch(setSelectedTool(ToolName.Select));

        return Promise.resolve();
      });

      const plane = renderer.scene.findByProps({ name: 'plane' });
      await renderer.fireEvent(plane, 'pointerDown', { eventObject: box.instance });

      expect(store.getState().scene.present.selectedMeshIds).toEqual([meshData.id]);
    });
  });
});
