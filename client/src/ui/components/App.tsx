import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { createClient } from 'really-simple-xdm';
import { ChakraProvider } from '@chakra-ui/react';
import '../../app.scss';
import Layout from './layout/Layout';
import Box from './box/Box';
import Toolbar from '../panels/toolbar/Toolbar';
import theme from './theme';
import Split from 'react-split';
import Canvas from '../panels/canvas/Canvas';
import AppContext, { AppContextType } from '../../core/AppContext';
import ToolStore from '@/services/tool/ToolStore';
import EditorStore from '@/services/EditorStore';
import CanvasEventHandler from '@/services/canvas/CanvasEventHandler';
import ModuleManager from '@/core/ModuleManager';
import PreviewModule from '@/services/preview/PreviewModule';
import useCanvasService from '../hooks/useCanvasService';

const App = () => {
  useEffect(() => {
    const iframeElement = document.getElementById('test-iframe') as HTMLIFrameElement; // the id of the frame containing the `Math` object to be called
    const promise = createClient({ targetWindow: iframeElement?.contentWindow as Window, targetOrigin: '*' }); // 'mathProxyPromise' is a promise which resolves with the proxy of 'Math'

    setTimeout(() => {
      promise.then((mathProxy) => {
        mathProxy.testFunc(window.Module.getEngineData());
      });
    }, 15000);
  });

  const [canvasContainer, setCanvasContainer] = useState<HTMLDivElement | undefined>();

  const canvasRef = useCallback((node: HTMLDivElement) => node && setCanvasContainer(node), []);

  const appContext = useMemo<AppContextType>(
    () => ({
      toolStore: new ToolStore(),
      editorStore: new EditorStore(),
      canvasEventHandler: window.CanvasEventHandler as CanvasEventHandler,
      moduleManager: new ModuleManager(),
    }),
    [],
  );

  useEffect(() => {
    /* code to prevent emscripten compiled code from eating key input */
    window.addEventListener(
      'keydown',
      function (event) {
        event.stopImmediatePropagation();
      },
      true,
    );

    window.addEventListener(
      'keyup',
      function (event) {
        event.stopImmediatePropagation();
      },
      true,
    );
  }, []);

  const canvasService = useCanvasService(appContext);

  useEffect(() => {
    const { moduleManager } = appContext;
    moduleManager.addModule(new PreviewModule(appContext));
    if (canvasService) {
      moduleManager.start();
    }
  }, [appContext, canvasService]);

  return (
    <ChakraProvider theme={theme} cssVarsRoot="body">
      <AppContext.Provider value={appContext}>
        <Layout
          header={
            <Box bgColor="blackAlpha.800" height="40px">
              Header
            </Box>
          }
          footer={
            <Box bgColor="blackAlpha.800" height="40px">
              Footer
            </Box>
          }
        >
          <Box display="flex" flexDirection="row">
            <Box width="50px">
              <Toolbar />
            </Box>
            <Split className="split" direction="horizontal" sizes={[75, 25]}>
              <Box ref={canvasRef}>
                <Canvas container={canvasContainer} />
              </Box>
              <Box display="flex" flexDir="column">
                <Box flex="1"></Box>
                <Box as="iframe" marginInline="15px" height="50%" id="test-iframe" src="iframe.html" />
              </Box>
            </Split>
          </Box>
        </Layout>
      </AppContext.Provider>
    </ChakraProvider>
  );
};

export default App;
