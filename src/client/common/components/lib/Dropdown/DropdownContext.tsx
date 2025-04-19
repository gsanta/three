import { createContext, ReactNode, useContext } from 'react';

export type DropdownContextType = {
  anchorName: string;
  id: string;
  value: string | null;
  selectedItem: ReactNode | undefined;
  setSelectedValue(value: string): void;
};

export const DropdownContext = createContext<DropdownContextType | undefined>(undefined);

const useDropdownContext = (): DropdownContextType => {
  const context = useContext(DropdownContext);

  if (!context) {
    throw new Error('useDropdownContext must be used within a Provider');
  }

  return context;
};

export default useDropdownContext;
