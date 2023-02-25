export function toABGRColor(rgbaColor: string): number {
  const r = rgbaColor.substring(1, 3);
  const g = rgbaColor.substring(3, 5);
  const b = rgbaColor.substring(5, 7);
  const a = rgbaColor.substring(7, 9);
  return Number('0x' + a + b + g + r);
}

export function toRGBAColor(abgrColor: string): number {
  const r = abgrColor.substring(7, 9);
  const g = abgrColor.substring(5, 7);
  const b = abgrColor.substring(3, 5);
  const a = abgrColor.substring(1, 3);

  return Number('0x' + r + b + g + a);
}
