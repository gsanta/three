import React from 'react';
import { ReactNode } from 'react';
import Split from 'react-split';

export type SplitPanelProps = {
  children: [ReactNode, ReactNode];
};

const SplitPanel = ({ children }: SplitPanelProps) => {
  return (
    <Split className="split" sizes={[75, 25]}>
      {children[0]}
      {children[1]}
    </Split>
  );
};

export default SplitPanel;
