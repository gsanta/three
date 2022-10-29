import Box from '@/ui/components/box/Box';
import { useResizeObserver } from '@/ui/hooks/useResizeObserver';
import React, { useCallback, useState } from 'react';
import useInitExternalModule from './hooks/useInitExternalModule';
import setWindowSize from './utils/setWindowSize';

const Canvas = () => {
  const [canvasNode, setCanvasNode] = useState<HTMLElement | undefined>(undefined);

  const canvasRef = useCallback((node: HTMLElement) => node && setCanvasNode(node), []);

  const { isModuleInitialized } = useInitExternalModule(() => setWindowSize(true, canvasNode));
  useResizeObserver(canvasNode, () => setWindowSize(isModuleInitialized, canvasNode));

  return <Box as="canvas" ref={canvasRef as any} id="canvas" width="100%" height="100%"></Box>;
};

export default Canvas;
