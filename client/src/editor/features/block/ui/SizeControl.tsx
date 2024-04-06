import RadioSwitchButton from '@/common/components/RadioSwitchButton';
import RadioSwitchGroup from '@/common/components/RadioSwitchGroup';
import { FormControl, FormLabel } from '@chakra-ui/react';
import BlockData from '../../../types/BlockData';

type SizeControlProps = {
  block: BlockData;
  onChange(size: number): void;
  value: number;
};

const SizeControl = ({ block, onChange, value }: SizeControlProps) => {
  const sizeOption = block.options.size;

  if (sizeOption.scales.length === 1) {
    return null;
  }

  return (
    <FormControl>
      <FormLabel display="flex" alignItems="center" gap="2" marginBottom="1">
        Size
      </FormLabel>
      <RadioSwitchGroup name="size-selector" onChange={(val: string) => onChange(Number(val))} value={String(value)}>
        {sizeOption.scales.map((scale) => (
          <RadioSwitchButton key={scale} value={String(scale)}>
            {String(scale)}
          </RadioSwitchButton>
        ))}
      </RadioSwitchGroup>
    </FormControl>
  );
};

export default SizeControl;
