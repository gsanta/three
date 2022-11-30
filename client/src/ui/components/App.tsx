import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { ChakraProvider, FormControl, FormLabel, Input } from '@chakra-ui/react';
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
import KeyboardHandler from '@/services/keyboard/KeyboardHandler';
import LifeCycleEventHandler from '@/services/core/LifeCycleEventHandler';
import WindowHandler from '@/services/core/WindowHandler';
import useInitApp from '../panels/canvas/hooks/useInitApp';
import LayerPanel from '../panels/layer/components/LayerPanel';
import LayerHandler from '../panels/layer/LayerHandler';
import EditorApi from '@/services/api/EditorApi';
import ToolOptionsBar from '../panels/toolbar/ToolOptionsBar';

const App = () => {
  const [canvasContainer, setCanvasContainer] = useState<HTMLDivElement | undefined>();

  const canvasRef = useCallback((node: HTMLDivElement) => node && setCanvasContainer(node), []);

  const appContext = useMemo<AppContextType>(() => {
    const editorApi = new EditorApi();

    return {
      editorApi,
      toolStore: new ToolStore(),
      editorStore: new EditorStore(editorApi),
      canvasEventHandler: window.CanvasEventHandler as CanvasEventHandler,
      lifeCycleEventHandler: new LifeCycleEventHandler(),
      moduleManager: new ModuleManager(),
      keyboardHandler: new KeyboardHandler(),
      windowHandler: new WindowHandler(),
      layerHandler: new LayerHandler(editorApi),
    };
  }, []);

  useInitApp(appContext, canvasContainer);

  useEffect(() => {
    /* code to prevent emscripten compiled code from eating key input */
    window.addEventListener(
      'keydown',
      function (event) {
        appContext.keyboardHandler.emitKeyDown(event);
        event.stopImmediatePropagation();
      },
      true,
    );

    window.addEventListener(
      'keyup',
      function (event) {
        console.log('keyup');
        event.stopImmediatePropagation();
      },
      true,
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <ChakraProvider theme={theme} cssVarsRoot="body">
      <AppContext.Provider value={appContext}>
        <Layout
          header={
            <Box bgColor="blackAlpha.800" paddingInlineStart="12" height="40px">
              <ToolOptionsBar />
            </Box>
          }
          footer={<Box bgColor="blackAlpha.800" height="40px"></Box>}
        >
          <Box display="flex" flexDirection="row">
            <Box width="50px">
              <Toolbar />
            </Box>
            <Split className="split" direction="horizontal" sizes={[75, 25]}>
              <Box ref={canvasRef}>
                <Canvas container={canvasContainer} />
              </Box>
              <Box display="flex" flexDir="column" bgColor="blackAlpha.800">
                <Box flex="1">
                  <LayerPanel />
                </Box>
                <Box as="iframe" height="50%" id="test-iframe" src="iframe.html" />
              </Box>
            </Split>
          </Box>
        </Layout>
      </AppContext.Provider>
    </ChakraProvider>
  );
};

export default App;
