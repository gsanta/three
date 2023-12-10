import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { Box, Tab, TabList, TabPanel, TabPanels, Tabs } from '@chakra-ui/react';
import './app.scss';
import Layout from '../common/components/Layout';
import Split from 'react-split';
import Canvas from '../features/editor/components/Canvas';
import useInitApp from '../features/editor/hooks/useInitApp';
import LayerPanel from '../features/layer/components/LayerPanel';
import KeyboardHandler from '@/app/keyboard/KeyboardHandler';
import { editor } from '@/features/editor/Editor';
import Header from '../common/components/Header';
import ToolEventListener from '@/features/tool/utils/ToolEventListener';
import Toolbar from '@/features/tool/components/Toolbar';
import ToolOptionsPanel from '../features/tool/components/ToolOptionsPanel';
import ColorPicker from '@/common/components/ColorPicker';

const App = () => {
  const [canvasNode, setCanvasNode] = useState<HTMLCanvasElement>();

  const canvasRef = useCallback((node: HTMLCanvasElement) => {
    if (node) {
      Module.canvas = node;
      setCanvasNode(node);
    }
  }, []);

  const app = useMemo(
    () => ({
      editorApi: editor,
      editorEvents: window.EditorEvents,
      keyboardHandler: new KeyboardHandler(),
    }),
    [],
  );

  useInitApp(canvasNode);

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
    <Layout header={<Header />} footer={<Box bgColor="orange.600" height="40px"></Box>}>
      <Box width="50px">
        <Toolbar />
      </Box>
      <Split className="split" direction="horizontal" sizes={[75, 25]} minSize={250}>
        <Canvas ref={canvasRef} />
        <Split className="split-vertical" direction="vertical" sizes={[50, 50]}>
          <Tabs display="flex" flexDir="column" isLazy>
            <TabList>
              <Tab>Tool</Tab>
              <Tab>Color</Tab>
            </TabList>
            <TabPanels alignItems="stretch" display="flex" flex="1" overflow="auto">
              <TabPanel flex="1" paddingInline={0}>
                <ToolOptionsPanel />
              </TabPanel>
              <TabPanel>
                <Box paddingInline="2" paddingBottom="4">
                  <ColorPicker />
                </Box>
              </TabPanel>
            </TabPanels>
          </Tabs>
          <Box overflowY="auto">
            <LayerPanel />
          </Box>
        </Split>
      </Split>
    </Layout>
  );
};

export default App;
