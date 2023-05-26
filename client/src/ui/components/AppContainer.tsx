import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { ChakraProvider, Tab, TabList, TabPanel, TabPanels, Tabs } from '@chakra-ui/react';
import '../../app.scss';
import Layout from './layout/Layout';
import Box from './box/Box';
import theme from './theme';
import Split from 'react-split';
import Canvas from '../panels/canvas/Canvas';
import App, { AppContext } from '../../app/App';
import useInitApp from '../panels/canvas/hooks/useInitApp';
import LayerPanel from '../../panels/layer/ui/components/LayerPanel';
import Toolbar from '@/panels/toolbar/ui/Toolbar';
import ToolOptionsPanel from '@/panels/tool_options/ui/ToolOptionsPanel';
import SceneViewer from '@/panels/scene_viewer/SceneViewer';
import KeyboardHandler from '@/services/keyboard/KeyboardHandler';
import { editor } from '@/services/editor/Editor';
import ToolEventListener from '@/panels/toolbar/ToolEventListener';
import Header from '../panels/header/Header';
import ProtectedPage from './layout/ProtectedPage';

const AppContainer = () => {
  const [canvasContainer, setCanvasContainer] = useState<HTMLCanvasElement | undefined>();

  console.log('app container runs');

  const canvasRef = useCallback((node: HTMLCanvasElement) => node && setCanvasContainer(node), []);

  const app: App = useMemo(
    () => ({
      editorApi: editor,
      editorEvents: window.EditorEvents,
      keyboardHandler: new KeyboardHandler(),
    }),
    [],
  );

  useInitApp(app, canvasContainer);

  useEffect(() => {
    const toolEventListener = new ToolEventListener(app.editorApi);
    toolEventListener.listen(window.EditorEvents);

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
        event.stopImmediatePropagation();
      },
      true,
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <ProtectedPage>
      <ChakraProvider theme={theme} cssVarsRoot="body">
        <AppContext.Provider value={app}>
          <Layout header={<Header />} footer={<Box bgColor="orange.400" height="40px"></Box>}>
            <Box width="50px">
              <Toolbar />
            </Box>
            <Split className="split" direction="horizontal" sizes={[75, 25]}>
              <Canvas ref={canvasRef} />
              <Split className="split-vertical" direction="vertical" sizes={[50, 50]}>
                <Box overflowY="auto">
                  <LayerPanel />
                </Box>
                <Tabs display="flex" flexDir="column" isLazy>
                  <TabList>
                    <Tab>Options</Tab>
                    <Tab>3D Viewer</Tab>
                  </TabList>
                  <TabPanels alignItems="stretch" display="flex" flex="1">
                    <TabPanel flex="1">
                      <ToolOptionsPanel />
                    </TabPanel>
                    <TabPanel display="flex" flex="1">
                      <SceneViewer />
                    </TabPanel>
                  </TabPanels>
                </Tabs>
              </Split>
            </Split>
          </Layout>
        </AppContext.Provider>
      </ChakraProvider>
    </ProtectedPage>
  );
};

export default AppContainer;
