import PixelUtils from '@/core/utils/PixelUtils';
import QueueLinearFloodFiller from './QueueLinearFloodFiller';

describe('QueueLinearFloodFiller', () => {
  it('fills', () => {
    // eslint-disable-next-line prettier/prettier
    const pixels = Uint32Array.from([
      0, 0, 1, 0,
      0, 0, 0, 0,
      0, 1, 1, 0,
      1, 1, 1, 1,
      1, 0, 0, 0
    ]);

    const width = 4;
    const height = 5;
    const targetColor = 1;
    const replacementColor = 2;
    const pixel = PixelUtils.getIndexAtGridPosition(2, 2, width);

    const floodFiller = new QueueLinearFloodFiller();
    floodFiller.floodFill({
      pixels,
      width,
      height,
      targetColor,
      replacementColor,
      pixel,
    });

    // eslint-disable-next-line prettier/prettier
    expect(Array.from(pixels)).toEqual([
      0, 0, 1, 0,
      0, 0, 0, 0,
      0, 2, 2, 0,
      2, 2, 2, 2,
      2, 0, 0, 0
    ])
  });
});
