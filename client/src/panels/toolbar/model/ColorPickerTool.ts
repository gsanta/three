import { toRGBAColor } from '@/utils/colorUtils';
import ExternalTool from './ExternalTool';

type ColorPickerData = {
  color: number;
};

class ColorPickerTool extends ExternalTool<ColorPickerData> {
  color?: string;

  setData({ color }: ColorPickerData): void {
    const abgrColor = Number(color).toString(16);
    this.color = toRGBAColor(abgrColor).toString(16);
  }
}

export default ColorPickerTool;
