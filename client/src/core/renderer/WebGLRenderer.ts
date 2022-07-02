import Program from '@/../engine/models/Program';
import CanvasRenderer from '@/features/canvas/CanvasRenderer';
import PDocument from '../models/PDocument';
import ColorUtils from '../utils/ColorUtils';
import PixelUtils from '../utils/PixelUtils';

class WebGLRenderer implements CanvasRenderer {
  private program: Program;

  constructor(program: Program) {
    this.program = program;
  }

  render(document: PDocument): void {
    const { backgroundLayer } = document;

    this.program.setPositions(PixelUtils.getClipPositions(backgroundLayer));

    const colors: number[] = [];
    // colors.push(1);
    // colors.push(0);
    // colors.push(0);
    // colors.push(1);
    // colors.push(1);
    // colors.push(0);
    // colors.push(0);
    // colors.push(1);
    // colors.push(1);
    // colors.push(0);
    // colors.push(0);
    // colors.push(1);
    // colors.push(1);
    // colors.push(0);
    // colors.push(0);
    // colors.push(1);
    for (const item of backgroundLayer.colors) {
      const rgba = ColorUtils.toRGBAColor(item);
      colors.push(...rgba);
      colors.push(...rgba);
      colors.push(...rgba);
      colors.push(...rgba);
      // const colors = backgroundLayer.colors.map<string>((color) => 'a');
    }

    this.program.setColors(colors);

    this.program.drawScene();
  }
}

export default WebGLRenderer;
