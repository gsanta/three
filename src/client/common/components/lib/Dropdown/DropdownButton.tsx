import { BiChevronDown } from 'react-icons/bi';
import useDropdownContext from './DropdownContext';

const DropdownButton = () => {
  const { anchorName, id, selectedItem } = useDropdownContext();

  return (
    <button className="btn btn-secondary" popoverTarget={id} style={{ anchorName } as React.CSSProperties}>
      {selectedItem}
      <BiChevronDown size="1rem" />
    </button>
  );
};

export default DropdownButton;
