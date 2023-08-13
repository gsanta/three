import { Box } from '@chakra-ui/react';
import React, { ReactNode } from 'react';

export type LayoutProps = {
  header?: ReactNode;
  footer?: ReactNode;
  children: ReactNode;
};

const Layout = ({ header, footer, children }: LayoutProps) => (
  <Box display="grid" gridTemplateRows="auto 1fr auto" height="100%">
    {header && (
      <Box as="header" id="header">
        {header}
      </Box>
    )}
    <Box as="main" display="flex" flexDirection="row" minH="0">
      {children}
    </Box>
    {footer && (
      <Box as="footer" id="footer">
        {footer}
      </Box>
    )}
  </Box>
);

export default Layout;
