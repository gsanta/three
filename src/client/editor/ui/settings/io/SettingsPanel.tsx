'use client';

import React from 'react';
import EditorDrawer from '../EditorDrawer';
import AppDrawer from '../AppDrawer';

const SettingsPanel = () => {
  return (
    <div className="flex items-center justify-between gap-4 w-[100%]">
      <EditorDrawer />
      <AppDrawer />
    </div>
  );
};

export default SettingsPanel;
