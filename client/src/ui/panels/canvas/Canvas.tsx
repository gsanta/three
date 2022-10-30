import Box from '@/ui/components/box/Box';
import { useResizeObserver } from '@/ui/hooks/useResizeObserver';
import React, { useCallback } from 'react';
import useInitExternalModule from './hooks/useInitExternalModule';
import setWindowSize from './utils/setWindowSize';

type CanvasProps = {
  container?: HTMLDivElement;
};

const Canvas = ({ container }: CanvasProps) => {
  const { isModuleInitialized } = useInitExternalModule(() => setWindowSize(true, container));

  const updateWindowSize = useCallback(
    () => setWindowSize(isModuleInitialized, container),
    [container, isModuleInitialized],
  );

  useResizeObserver(container, updateWindowSize);

  return <Box as="canvas" id="canvas"></Box>;
};

export default Canvas;
