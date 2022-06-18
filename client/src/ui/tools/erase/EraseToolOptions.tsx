import React from 'react';
import { FormControl, FormLabel, HStack, Select } from '@chakra-ui/react';
import { ChangeEvent, useContext } from 'react';
import DataContext from '../../DataContext';
import useStore from '@/ui/state/hooks/useStore';
import useObservable from '@/ui/state/hooks/useObservable';

const EraseToolOptions = () => {
  const { toolStore } = useContext(DataContext);
  const [bindToolStore] = useStore(DataContext, 'toolStore');
  const size = useObservable(bindToolStore, (store) => store.rectangle?.size);

  const handleChange = (e: ChangeEvent<HTMLSelectElement>) => {
    if (toolStore && toolStore.erase) {
      toolStore.erase.size = parseInt(e.currentTarget.value, 10);
    }
  };

  const options = toolStore?.erase?.sizes.map((s) => <option value={s}>{s}</option>);

  return (
    <HStack spacing="1rem">
      <FormControl width="fit-content">
        <FormLabel htmlFor="rectangle-size">Size</FormLabel>
        <Select id="rectangle-size" width="100px" value={size} size="xs" onChange={handleChange}>
          {options}
        </Select>
      </FormControl>
    </HStack>
  );
};

export default EraseToolOptions;
