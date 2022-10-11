import React, { ReactNode } from 'react';
import Box from '../box/Box';

export type LayoutProps = {
  header?: ReactNode;
  footer?: ReactNode;
  children: ReactNode;
};

const Layout = ({ header, footer, children }: LayoutProps) => (
  <Box display="grid" gridTemplateRows="auto 1fr auto" flexDir="column" minH="100%">
    {header && <Box id="header">{header}</Box>}
    {children}
    {footer && <Box id="footer">{footer}</Box>}
  </Box>
);

export default Layout;
