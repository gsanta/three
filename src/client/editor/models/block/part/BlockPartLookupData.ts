export type BlockPartRole =
  | 'pin'
  | 'wall-slot'
  | 'ceil-slot'
  | 'floor-slot'
  | 'load-on'
  | 'road-slot'
  | 'load-off'
  | 'wall-join'
  | 'transformer-holder'
  | 'weather-head-anchor';

type BlockPartLookupData = {
  hide?: boolean;
  isSelected?: boolean;
  isConnected: Record<number, boolean>;
  orientation: number;
  pinCount?: number;
  roles?: BlockPartRole[];
  type: 'placeholder' | 'phisycal';
};

export default BlockPartLookupData;
