import Editor from '@/editor/Editor';
import ToolType from '@/editor/tool/types/ToolType';
import { useCallback, useState } from 'react';

const Canvas = () => {
  const [editor, setEditor] = useState<Editor | undefined>(undefined);
  const ref = useCallback((node: HTMLCanvasElement) => {
    node.width = 400;
    node.height = 400;
    const context = node.getContext('2d');
    if (context) {
      setEditor(new Editor(context));
    }
  }, []);

  return (
    <div
      onClick={(e) => {
        editor?.toolStore.getTool(ToolType.Pencil)?.onClick(e.nativeEvent);
      }}
    >
      <canvas ref={ref} className="Canvas" />
    </div>
  );
};

export default Canvas;
