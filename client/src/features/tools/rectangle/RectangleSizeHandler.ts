import SelectHandler from '@/core/tool/SelectHandler';

class RectangleSizeHandler implements SelectHandler<number, 'rectangleTool'> {
  type = 'select' as const;

  store = 'rectangleTool' as const;

  value = 'size' as const;

  options = [1, 2, 3, 4];
}

export default RectangleSizeHandler;
