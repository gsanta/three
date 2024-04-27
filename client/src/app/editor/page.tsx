'use client';

import { Box, ChakraProvider, Tab, TabList, TabPanel, TabPanels, Tabs } from '@chakra-ui/react';
import './app.scss';
import Layout from '../../client/common/components/Layout';
import Split from 'react-split';
import Canvas from '../../client/editor/services/scene/ui/Canvas';
import Header from '../../client/common/components/Header';
import Toolbar from '../../client/editor/services/tool/ui/Toolbar';
import ToolOptionsPanel from '../../client/editor/services/tool/ui/ToolOptionsPanel';
import ColorPicker from '../../client/common/components/ColorPicker';
import ProtectedPage from '../../client/common/components/ProtectedPage';
import theme from '@/client/common/themes/theme';

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
