import ColorUtils from './ColorUtils';

describe('ColorUtils', () => {
  it('can convert from rgb representation to int', () => {
    const color = 'rgb(255, 0, 0, 1)';

    const result = ColorUtils.colorToInt(color);
    expect(ColorUtils.intToColor(result)).toBe('rgb(255, 0, 0, 1)');
  });

  it('can convert from string representation to int', () => {
    const color = 'blue';

    const result = ColorUtils.colorToInt(color);
    expect(ColorUtils.intToColor(result)).toBe('rgb(255, 0, 0, 1)');
  });
});
