import Point from '@/core/primitives/Point';
import QueueLinearFloodFiller from './QueueLinearFloodFiller';

describe('QueueLinearFloodFiller', () => {
  it('fills', () => {
    // eslint-disable-next-line prettier/prettier
    const pixels = [
      0, 0, 1, 0,
      0, 0, 0, 0,
      0, 1, 1, 0,
      1, 1, 1, 1,
      1, 0, 0, 0
  ];

    const width = 4;
    const height = 5;
    const targetColor = 1;
    const replacementColor = 2;
    const point = new Point(2, 2);

    const floodFiller = new QueueLinearFloodFiller();
    floodFiller.floodFill({
      pixels,
      width,
      height,
      targetColor,
      replacementColor,
      point,
    });

    // eslint-disable-next-line prettier/prettier
    expect(pixels).toEqual([
      0, 0, 1, 0,
      0, 0, 0, 0,
      0, 2, 2, 0,
      2, 2, 2, 2,
      2, 0, 0, 0
    ])
  });
});
