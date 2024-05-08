import { Box, BoxProps, Divider, Text } from '@chakra-ui/react';
import React from 'react';
import { ReactNode } from 'react';

type PanelProps = {
  children: ReactNode;
  header?: ReactNode;
} & BoxProps;

const Panel = (props: PanelProps) => {
  const { children, header, ...rest } = props;
  return (
    <Box as="section" display="flex" flexDir="column" {...rest}>
      {header}
      <Box display="flex" flex="1" flexDir="column" paddingInline="2">
        {children}
      </Box>
    </Box>
  );
};

type PanelHeaderProps = {
  children?: ReactNode;
  title: string;
};

Panel.Header = ({ children, title }: PanelHeaderProps) => (
  <Box paddingInline="2" paddingBlock="2">
    <Box alignItems="center" display="flex" justifyContent="space-between" backgroundColor="gray.700">
      <Text color="gray.300" fontWeight="bold" paddingInlineStart="2" textTransform="uppercase">
        {title}
      </Text>
      {children}
    </Box>
    <Divider marginBlockStart="2" />
  </Box>
);

export default Panel;
