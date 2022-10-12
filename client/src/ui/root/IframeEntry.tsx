import { ChakraProvider } from '@chakra-ui/react';
import React, { useCallback, useEffect, useState } from 'react';
import '../../app.scss';
import Box from '../components/box/Box';
import theme from '../components/theme';

const IframeEntry = () => {
  const [isModuleSet, setIsModuleSet] = useState(false);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => {
    if (window?.Module?.isRuntimeInitialize && !isModuleSet) {
      setIsModuleSet(true);
    }
  });

  const contentRef = useCallback(
    (node: HTMLDivElement) => {
      if (node) {
        const rect = node.getBoundingClientRect();

        if (isModuleSet) {
          window.Module.setWindowSize(rect.width, rect.height);
        }
      }
    },
    [isModuleSet],
  );

  return (
    <ChakraProvider theme={theme} cssVarsRoot="body">
      <Box ref={contentRef}>
        The iframe
        {/* <canvas id="canvas">efgh</canvas> */}
      </Box>
    </ChakraProvider>
  );
};

export default IframeEntry;
