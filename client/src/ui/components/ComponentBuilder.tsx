import { ReactNode } from 'react';
import Handler from '@/core/ui/Handler';
import SelectHandler from '@/core/tool/SelectHandler';
import Select from './select/Select';

class ComponentBuilder {
  static buildSelect() {}

  static build(handler: Handler): ReactNode {
    switch (handler.type) {
      case 'select':
        return <Select handler={handler as SelectHandler<unknown, any>} />;
      default:
        return null;
    }
  }
}

export default ComponentBuilder;
