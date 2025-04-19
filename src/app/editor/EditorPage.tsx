'use client';

import { Box, Tab, TabList, TabPanel, TabPanels, Tabs } from '@chakra-ui/react';
import './app.scss';
import Layout from '../../client/common/components/globals/Layout';
import Split from 'react-split';
import Canvas from '../../client/editor/components/scene/components/Canvas';
import Header from '../../client/common/components/globals/Header';
import Toolbar from '../../client/editor/components/tool/Toolbar';
import ToolOptionsPanel from '../../client/editor/components/tool/ToolOptionsPanel';
import ProtectedPage from '../../client/common/components/globals/ProtectedPage';
import BlockCategoriesResponse from '@/common/response_types/BlockCategoriesResponse';
import BlockAddMethodsResponse from '@/common/response_types/BlockAddMethodsResponse';
import { useEffect } from 'react';
import { useAppDispatch } from '@/client/common/hooks/hooks';
import { setBlockAddMethods, setBlockCategories } from '@/client/editor/stores/blockCategory/blockCategorySlice';
import { Provider } from 'react-redux';
import { store } from '@/client/common/utils/store';

type EditorPageProps = {
  blockAddMethods: BlockAddMethodsResponse;
  blockCategories: BlockCategoriesResponse;
};

const EditorPageContent = ({ blockAddMethods, blockCategories }: EditorPageProps) => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(setBlockCategories(blockCategories.items));
    dispatch(setBlockAddMethods(blockAddMethods.items));
  }, [blockAddMethods.items, blockCategories.items, dispatch]);

  return (
    <ProtectedPage>
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
              </TabPanels>
            </Tabs>
            <Box overflowY="auto"></Box>
          </Split>
        </Split>
      </Layout>
    </ProtectedPage>
  );
};

const EditorPage = async (props: EditorPageProps) => {
  return (
    <Provider store={store}>
      <EditorPageContent {...props} />
    </Provider>
  );
};

export default EditorPage;
