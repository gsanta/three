import { PageHeader } from 'antd';
import React from 'react';
import MainMenu from './Menu';

const Header = () => (
  <PageHeader
    className="site__header"
    onBack={() => null}
    title="Game Designer"
    extra={<MainMenu/>}
  ></PageHeader>
);

export default Header;

