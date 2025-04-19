import SettingsPanel from '../../editor/components/settings/io/SettingsPanel';
import UserSettings from '../../user/components/UserSettings';
import React from 'react';

const Header = () => {
  return (
    <div className="border-b border-gray-600 flex justify-between h-[50px] px-1 py-1 bg-base-300">
      <SettingsPanel />
      <UserSettings />
    </div>
  );
};

export default Header;
