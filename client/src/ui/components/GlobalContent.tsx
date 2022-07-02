import React from 'react';
import { ReactNode } from 'react';
import useCurrentUser from './context/useCurrentUser';

type GlobalContentProps = {
  children: ReactNode;
};

const GlobalContent = ({ children }: GlobalContentProps) => {
  useCurrentUser();

  return <>{children}</>;
};

export default GlobalContent;
