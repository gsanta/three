import SettingsPanel from '../../editor/components/settings/io/SettingsPanel';
import UserSettings from '../../user/components/UserSettings';
import { Box } from '@chakra-ui/react';
import React from 'react';

const Header = () => {
  return (
    <Box
      borderBottom="1px solid"
      borderColor="gray.600"
      display="flex"
      justifyContent="space-between"
      height="40px"
      paddingInline="1"
      paddingBlock="1"
    >
      <SettingsPanel />
      <UserSettings />
    </Box>
  );
};

export default Header;
