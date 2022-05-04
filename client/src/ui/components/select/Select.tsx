import SelectHandler from '@/core/tool/SelectHandler';
import useData from '@/ui/hooks/useData';
import useStore from '@/ui/hooks/useStore';
import { Select as CSelect } from '@chakra-ui/react';
import { ChangeEvent } from 'react';

type Props = {
  handler: SelectHandler<unknown, any>;
};

const Select = ({ handler }: Props) => {
  const store = useStore(handler.store);
  const [val] = useData(handler.store, handler.value);

  const handleChange = (e: ChangeEvent<HTMLSelectElement>) => {
    store[val] = e.currentTarget.value;
  };

  return (
    <CSelect width="100px" defaultValue={val} size="xs" onChange={handleChange}>
      <option value="size-1">1</option>
      <option value="size-2">2</option>
      <option value="size-3">3</option>
    </CSelect>
  );
};

export default Select;
