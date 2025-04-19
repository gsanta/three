import { Children, isValidElement, ReactElement, ReactNode, useCallback, useMemo } from 'react';
import { DropdownContext } from './DropdownContext';
import DropdownItem, { DropdownItemProps } from './DropdownItem';

type DropdownProps = {
  children: ReactNode[];
  id: string;
  onChange(value: string): void;
  value: string;
};

type DropdownItemElement = ReactElement<DropdownItemProps, typeof DropdownItem>;

const Dropdown = ({ children, id, onChange, value }: DropdownProps) => {
  const handleChange = useCallback(
    (newValue: string) => {
      onChange(newValue);

      const popoverEl = document.getElementById(id);
      popoverEl?.hidePopover();
    },
    [id, onChange],
  );

  const dropdownItems = useMemo(() => {
    const items = Children.toArray(children).filter(
      (child) => isValidElement(child) && child.type === DropdownItem,
    ) as DropdownItemElement[];

    return items;
  }, [children]);

  const selectedItem = useMemo(
    () => dropdownItems.find((item) => item.props.value === value)?.props.children,
    [dropdownItems, value],
  );

  const context = useMemo(() => {
    return {
      anchorName: `--anchor-${id}`,
      id,
      selectedItem,
      value,
      setSelectedValue: handleChange,
    };
  }, [handleChange, id, selectedItem, value]);

  const [child0, ...restChildren] = children;

  return (
    <DropdownContext.Provider value={context}>
      {child0}
      <ul
        className="dropdown menu w-52 rounded-box bg-base-100 shadow-sm"
        popover="auto"
        id={id}
        style={{ positionAnchor: context.anchorName } as React.CSSProperties}
      >
        {restChildren}
        {/* <li>
          <button
            onClick={() => {
              const dialog = document.getElementById('import-dialog') as HTMLDialogElement;
              dialog.showModal();
            }}
          >
            Import
          </button>
        </li>
        <li>
          <button
            onClick={() => {
              const dialog = document.getElementById('export-dialog') as HTMLDialogElement;
              dialog.showModal();
            }}
          >
            Export
          </button>
        </li> */}
      </ul>
    </DropdownContext.Provider>
  );
};

export default Dropdown;
