import React, { useCallback, useEffect, useState } from 'react';
import { ChakraProvider } from '@chakra-ui/react';
import '../../app.scss';
import Layout from './layout/Layout';
import Box from './box/Box';
import theme from './theme';
import Split from 'react-split';
import Canvas from '../panels/canvas/Canvas';
import App, { AppContext } from '../../app/App';
import useInitApp from '../panels/canvas/hooks/useInitApp';
import LayerPanel from '../../panels/layer/ui/components/LayerPanel';
import ToolOptionsBar from '@/panels/toolbar/ui/ToolOptionsBar';
import Toolbar from '@/panels/toolbar/ui/Toolbar';

type AppContainerProps = {
  app: App;
};

const AppContainer = ({ app }: AppContainerProps) => {
  const [canvasContainer, setCanvasContainer] = useState<HTMLCanvasElement | undefined>();

  const canvasRef = useCallback((node: HTMLCanvasElement) => node && setCanvasContainer(node), []);

  useInitApp(app, canvasContainer);

  useEffect(() => {
    /* code to prevent emscripten compiled code from eating key input */
    window.addEventListener(
      'keydown',
      function (event) {
        app.keyboardHandler.emitKeyDown(event);
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
      <AppContext.Provider value={app}>
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
              <Box>
                <Canvas container={canvasContainer} ref={canvasRef} />
              </Box>
              <Box display="flex" flexDir="column" bgColor="blackAlpha.800">
                <Box flex="1">
                  <LayerPanel />
                </Box>
                {/* <Box as="iframe" height="50%" id="test-iframe" src="iframe.html" /> */}
              </Box>
            </Split>
          </Box>
        </Layout>
      </AppContext.Provider>
    </ChakraProvider>
  );
};

export default AppContainer;