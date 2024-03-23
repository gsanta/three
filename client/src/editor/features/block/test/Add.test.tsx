import CanvasContent from '@/editor/services/scene/ui/CanvasContent';
import { renderWithProviders } from '@/editor/test/testUtils';
import { Vector3 } from 'three';

describe('when add tool is active', () => {
  describe('when clicking on the plane', () => {
    it('adds the mesh at the position of the click', async () => {
      const { renderer } = await renderWithProviders(<CanvasContent />);

      const plane = renderer.scene.findByProps({ name: 'plane' });
      await renderer.fireEvent(plane, 'pointerMove', { point: new Vector3(0, 0, 1) });
      await renderer.fireEvent(plane, 'pointerDown', { eventObject: plane });

      const box = renderer.scene.findAllByProps({ name: 'box' })[0];

      expect(box.instance.position).toEqual(new Vector3(0, 0.5, 1));
    });
  });
});
