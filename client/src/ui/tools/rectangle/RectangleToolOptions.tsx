import { Select } from '@chakra-ui/react';
import { ChangeEvent, useContext } from 'react';
import DataContext from '../../DataContext';
import useToolData from '../../hooks/useToolData';

const RectangleToolOptions = () => {
  const { tools } = useContext(DataContext);
  const size = useToolData('size', tools?.rectangle);

  const handleChange = (e: ChangeEvent<HTMLSelectElement>) => {
    if (tools && tools.rectangle) {
      tools.rectangle.size = parseInt(e.currentTarget.value, 10);
    }
  };

  const options = tools?.rectangle?.sizes.map((s) => <option value={s}>s</option>);

  return (
    <Select width="100px" value={size} size="xs" onChange={handleChange}>
      {options}
    </Select>
  );
};

export default RectangleToolOptions;
