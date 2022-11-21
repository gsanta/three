import { ChakraProvider } from '@chakra-ui/react';
import { createServer } from 'really-simple-xdm';

import React, { useCallback, useEffect, useState } from 'react';
import '../../app.scss';
import Box from '../components/box/Box';
import theme from '../components/theme';
import { useResizeObserver } from '../hooks/useResizeObserver';

const IframeEntry = () => {
  const [isModuleSet, setIsModuleSet] = useState(false);
  const [canvasNode, setCanvasNode] = useState<HTMLElement | undefined>(undefined);
  // const [server, setServer] = useState<any>();

  useEffect(() => {
    const a = {
      testFunc: (data: string) => window.Module?.setEngineData(data),
    };

    const newServer = createServer({ serviceObject: a, targetOrigin: '*' });
    newServer.serve();
  }, []);

  const setWindowSize = () => {
    if (canvasNode && isModuleSet) {
      const rect = canvasNode.getBoundingClientRect();
      window.Module?.setWindowSize(rect.width, rect.height);
    }
  };

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => {
    if (window?.Module?.isRuntimeInitialized && !isModuleSet) {
      setIsModuleSet(true);
      setWindowSize();
    }
  });

  // const contentRef = useCallback(
  //   (node: HTMLDivElement) => {
  //     if (node) {
  //       const rect = node.getBoundingClientRect();

  //       if (isModuleSet) {
  //         window.Module.setWindowSize(rect.width, rect.height);
  //       }
  //     }
  //   },
  //   [isModuleSet],
  // );

  useResizeObserver(canvasNode, setWindowSize);

  const contentRef = useCallback((node: HTMLDivElement) => {
    if (node) {
      setCanvasNode(node);
    }
  }, []);

  return (
    <ChakraProvider theme={theme} cssVarsRoot="body">
      <Box ref={contentRef} id="abcd" width="100%" height="100%">
        <canvas id="canvas"></canvas>
      </Box>
    </ChakraProvider>
  );
};

export default IframeEntry;
