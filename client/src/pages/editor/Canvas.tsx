import React from 'react';
import Editor from '@/editor/Editor';
import { useCallback, useState } from 'react';
import Palette from '@/editor/components/palette/Palette';
import EditorContext from '@/editor/components/EditorContext';

const Canvas = () => {
  const [editor, setEditor] = useState<Editor | undefined>(undefined);

  const ref = useCallback((node: HTMLCanvasElement) => {
    if (node) {
      node.width = 400;
      node.height = 400;
      const context = node.getContext('2d');
      if (context) {
        setEditor(new Editor(node, context));
      }
    }
  }, []);

  return (
    <EditorContext.Provider value={editor}>
      <div>
        <Palette />
        <div
          onClick={(e) => {
            editor?.mouseHandler.onClick(e.nativeEvent);
          }}
        >
          <canvas ref={ref} className="Canvas" data-testid="editor-canvas" />
        </div>
      </div>
    </EditorContext.Provider>
  );
};

export default Canvas;
