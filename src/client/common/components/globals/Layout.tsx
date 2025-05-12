import React, { ReactNode } from 'react';

export type LayoutProps = {
  header?: ReactNode;
  footer?: ReactNode;
  children: ReactNode;
};

const Layout = ({ header, footer, children }: LayoutProps) => (
  <div className="grid grid-rows-[auto_1fr_auto] h-full">
    {header && <header id="header">{header}</header>}
    <main className="flex flex-row min-h-0">{children}</main>
    {footer && <footer id="footer">{footer}</footer>}
  </div>
);

export default Layout;
