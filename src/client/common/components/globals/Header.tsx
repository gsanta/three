import SettingsPanel from '../../../editor/ui/settings/io/SettingsPanel';
import UserSettings from '../../../user/components/UserSettings';
import React from 'react';

const Header = () => {
  return (
    <div className="navbar bg-base-300">
      <SettingsPanel />
      <UserSettings />
    </div>
  );
};

export default Header;
