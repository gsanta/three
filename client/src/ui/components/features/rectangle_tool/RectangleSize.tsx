import SelectHandler from '@/core/tool/SelectHandler';
import useData from '@/ui/hooks/useData';
import { Select } from '@chakra-ui/react';
import { useState, ChangeEvent } from 'react';

const RectangleSize = ({ toolOption }: { toolOption: SelectHandler<any> }) => {
  const [size, setSize] = useState('size-1');
  const [data] = useData(toolOption.store, toolOption.value);

  const handleChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setSize(e.currentTarget.value);
  };

  return (
    <Select width="100px" defaultValue={size} size="xs" onChange={handleChange}>
      <option value="size-1">1</option>
      <option value="size-2">2</option>
      <option value="size-3">3</option>
    </Select>
  );
};

export default RectangleSize;
