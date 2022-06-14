import React from 'react';
import { FormControl, FormLabel, HStack, Select, Switch } from '@chakra-ui/react';
import { ChangeEvent, useContext } from 'react';
import DataContext from '../../DataContext';
import useStore from '@/ui/state/hooks/useStore';
import useObservable from '@/ui/state/hooks/useObservable';

const RectangleToolOptions = () => {
  const { toolStore } = useContext(DataContext);
  const [bindToolStore] = useStore(DataContext, 'toolStore');
  const [size, filled] = useObservable(
    bindToolStore,
    (store) => store.rectangle?.size,
    (store) => store.rectangle?.filled,
  );

  const handleChange = (e: ChangeEvent<HTMLSelectElement>) => {
    if (toolStore && toolStore.rectangle) {
      toolStore.rectangle.size = parseInt(e.currentTarget.value, 10);
    }
  };

  const handleFilledChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (toolStore && toolStore.rectangle) {
      toolStore.rectangle.filled = e.target.checked;
    }
  };

  const options = toolStore?.rectangle?.sizes.map((s) => <option value={s}>{s}</option>);

  return (
    <HStack spacing="1rem">
      <FormControl width="fit-content">
        <FormLabel htmlFor="rectangle-size">Size</FormLabel>
        <Select id="rectangle-size" width="100px" value={size} size="xs" onChange={handleChange}>
          {options}
        </Select>
      </FormControl>
      <FormControl width="fit-content">
        <FormLabel htmlFor="rectangle-filled">Filled</FormLabel>
        <Switch id="rectangle-filled" defaultChecked={filled} checked={filled} onChange={handleFilledChange} />
      </FormControl>
    </HStack>
  );
};

export default RectangleToolOptions;
