import { Box, Divider, Text } from '@chakra-ui/react';
import React from 'react';
import { ReactNode } from 'react';

type PanelProps = {
  children: ReactNode;
  header: ReactNode;
};

const Panel = ({ children, header }: PanelProps) => (
  <Box as="section" display="flex" flexDir="column" height="100%">
    {header}
    <Box display="flex" flex="1" flexDir="column" paddingInline="2">
      {children}
    </Box>
  </Box>
);

type PanelHeaderProps = {
  children?: ReactNode;
  title: string;
};

Panel.Header = ({ children, title }: PanelHeaderProps) => (
  <Box paddingInline="2" paddingBlock="2">
    <Box alignItems="center" display="flex" justifyContent="space-between">
      <Text color="gray.300" fontWeight="bold" paddingInlineStart="2" textTransform="uppercase">
        {title}
      </Text>
      {children}
    </Box>
    <Divider marginBlockStart="2" />
  </Box>
);

export default Panel;
