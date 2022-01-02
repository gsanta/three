import React from 'react';
import { Tabs } from 'antd';
import SpriteSheetElement from './SpriteSheetElement';
import SpriteSearch from './SpriteSearch';

const { TabPane } = Tabs;

function callback(key: string) {
  console.log(key);
}

const SpritePanel = () => {
  return (
    <Tabs defaultActiveKey="1" onChange={callback}>
      <TabPane tab="Sprites" key="1">
        <SpriteSheetElement />
      </TabPane>
      <TabPane tab="Library" key="2">
        <SpriteSearch />
      </TabPane>
      <TabPane tab="Tab 3" key="3">
        Content of Tab Pane 3
      </TabPane>
    </Tabs>
  );
};

export default SpritePanel;
