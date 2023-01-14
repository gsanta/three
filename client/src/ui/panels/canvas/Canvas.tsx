import Box from '@/ui/components/box/Box';
import useAppContext from '@/ui/hooks/useAppContext';
import { useResizeObserver } from '@/ui/hooks/useResizeObserver';
import { forwardRef } from '@chakra-ui/react';
import React from 'react';
import { useEffectOnce } from 'usehooks-ts';

type CanvasProps = {
  container?: HTMLCanvasElement;
};

const Canvas = forwardRef(({ container }: CanvasProps, ref) => {
  const { editorApi } = useAppContext();

  useEffectOnce(() => {
    setTimeout(() => {
      editorApi.setWindowSize(1500, 1000);
    }, 1000);
  });

  useResizeObserver(container?.parentElement as HTMLDivElement, () => {});

  return <Box as="canvas" id="canvas" ref={ref}></Box>;
});

export default Canvas;
