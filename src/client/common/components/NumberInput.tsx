import { Input, InputProps } from '@chakra-ui/react';
import { useEffect, useState } from 'react';

type NumberInputProps = InputProps;

const NumberInput = (props: NumberInputProps) => {
  const { value, onChange, ...rest } = props;
  const [val, setVal] = useState<NumberInputProps['value']>(value);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.value === '') {
      setVal('');
    } else {
      onChange?.(e);
    }
  };

  useEffect(() => {
    setVal(value);
  }, [value]);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return <Input {...(rest as any)} value={val} onChange={handleChange} />;
};

export default NumberInput;
