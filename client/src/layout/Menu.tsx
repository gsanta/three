import { Menu } from 'antd';
import SubMenu from 'antd/lib/menu/SubMenu';
import React from 'react';
import { SettingOutlined } from '@ant-design/icons';
import { useDispatch } from 'react-redux';
import { openLoginDialogAction } from '../features/login/loginReducer';

const MainMenu = () => {
  const dispatch = useDispatch();
  const openLogin = () => dispatch({ type: openLoginDialogAction.type, payload: true });

  return (
    <Menu mode="horizontal" style={{width: 250}}>
      <SubMenu key="SubMenu" icon={<SettingOutlined />} title="Navigation Three - Submenu">
        <Menu.ItemGroup title="Item 1">
          <Menu.Item key="setting:1" onClick={openLogin}>Log in</Menu.Item>
          <Menu.Item key="setting:2">Option 2</Menu.Item>
        </Menu.ItemGroup>
        <Menu.ItemGroup title="Item 2">
          <Menu.Item key="setting:3">Option 3</Menu.Item>
          <Menu.Item key="setting:4">Option 4</Menu.Item>
        </Menu.ItemGroup>
      </SubMenu>
    </Menu>
  )
};

export default MainMenu;
