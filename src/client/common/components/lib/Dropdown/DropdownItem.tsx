import { ReactNode } from 'react';
import useDropdownContext from './DropdownContext';

export type DropdownItemProps = {
  children: ReactNode;
  value: string;
};

const DropdownItem = ({ children, value }: DropdownItemProps) => {
  const { setSelectedValue } = useDropdownContext();

  return (
    <li>
      <button onClick={() => setSelectedValue(value)}>{children}</button>
    </li>
  );
};

export default DropdownItem;
