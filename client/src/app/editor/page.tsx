'use client';

import { Box, ChakraProvider, Tab, TabList, TabPanel, TabPanels, Tabs, theme } from '@chakra-ui/react';
import './app.scss';
import Layout from '../../common/components/Layout';
import Split from 'react-split';
import Canvas from '../../features/editor/components/Canvas';
import Header from '../../common/components/Header';
import Toolbar from '../../features/tool/components/Toolbar';
import ToolOptionsPanel from '../../features/tool/components/ToolOptionsPanel';
import ColorPicker from '../../common/components/ColorPicker';
import ProtectedPage from '../../common/components/ProtectedPage';

const Page = () => {
  return (
    <ProtectedPage>
      <ChakraProvider theme={theme} cssVarsRoot="body">
        <Layout header={<Header />} footer={<Box bgColor="orange.600" height="40px"></Box>}>
          <Box width="50px">
            <Toolbar />
          </Box>
          <Split className="split" direction="horizontal" sizes={[75, 25]} minSize={250}>
            <Canvas />
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
              <Box overflowY="auto"></Box>
            </Split>
          </Split>
        </Layout>
      </ChakraProvider>
    </ProtectedPage>
  );
};

export default Page;
