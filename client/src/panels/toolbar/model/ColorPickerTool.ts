import Editor from '@/services/editor/Editor';
import EditorStore from '@/services/settings/EditorStore';
import { IconName } from '@/ui/components/icon/Icon';
import { toRGBAColor } from '@/utils/colorUtils';
import ExternalTool from './ExternalTool';
import ToolName from './ToolName';
import ToolSelectionEvent from './ToolSelectionEvents';

type ColorPickerData = {
  color: number;
};

class ColorPickerTool extends ExternalTool<ColorPickerData> {
  color?: string;

  private editorStore: EditorStore;

  constructor(
    name: ToolName,
    iconName: IconName,
    editorApi: Editor,
    editorStore: EditorStore,
    toolSelectionEvent?: ToolSelectionEvent,
  ) {
    super(name, iconName, editorApi, toolSelectionEvent);

    this.editorStore = editorStore;
  }

  setData({ color }: ColorPickerData): void {
    const abgrColor = Number(color).toString(16);
    this.color = toRGBAColor('#' + abgrColor).toString(16);

    this.editorStore.setColor('#' + this.color);
  }
}

export default ColorPickerTool;
