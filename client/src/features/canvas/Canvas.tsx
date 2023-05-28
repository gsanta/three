import { useAppSelector } from '@/hooks';
import Box from '@/components/box/Box';
import { useResizeObserver } from './hooks/useResizeObserver';
import { forwardRef } from '@chakra-ui/react';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useDebounce } from 'usehooks-ts';

const Canvas = forwardRef((_props, ref) => {
  const editor = useAppSelector((state) => state.tool.editor);
  const [width, setWidth] = useState(100);
  const [height, setHeight] = useState(100);
  const debouncedWidth = useDebounce(width, 200);
  const debouncedHeight = useDebounce(height, 200);

  const canvasParentRef = useRef<HTMLDivElement>(null);

  const resize = useCallback(() => {
    if (canvasParentRef.current) {
      setWidth(canvasParentRef.current.offsetWidth);
      setHeight(canvasParentRef.current.offsetHeight);
    }
  }, []);

  useEffect(() => {
    if (editor?.isRuntimeInitialized) {
      // TODO: create action instead of direct call
      editor.setWindowSize(debouncedWidth, debouncedHeight);
    }
  }, [editor, debouncedWidth, debouncedHeight]);

  useResizeObserver(canvasParentRef.current, resize);

  return (
    <Box display="flex" height="100%" justifyContent="space-around" overflow="hidden" ref={canvasParentRef}>
      <Box as="canvas" id="canvas" ref={ref} width={debouncedWidth} height={debouncedHeight}></Box>
    </Box>
  );
});

export default Canvas;
