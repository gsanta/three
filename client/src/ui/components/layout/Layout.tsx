import React, { ReactNode } from 'react';
import Box from '../box/Box';

export type LayoutProps = {
  header?: ReactNode;
  footer?: ReactNode;
  children: ReactNode;
};

const Layout = ({ header, footer, children }: LayoutProps) => (
  <Box display="flex" flexDir="column" minH="100%">
    {header && (
      <Box id="header" width="100%">
        {header}
      </Box>
    )}
    <Box flex="1" display="flex" flexDir="row">{children}</Box>
    {footer && (
      <Box id="footer" width="100%">
        {footer}
      </Box>
    )}
  </Box>
);

export default Layout;
