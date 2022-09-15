import { IconName } from '@/ui/components/icon/Icon';

interface Tool {
  name: string;
  iconName: IconName;

  activate(): void;
}

export default Tool;
