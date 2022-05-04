import { DataContextType } from '@/ui/DataContext';
import Handler from '../ui/Handler';

interface SelectHandler<DataType, T extends keyof DataContextType> extends Handler {
  type: 'select';
  store: T;
  value: keyof DataContextType[T];
  options: DataType[];
}

export default SelectHandler;
