export type BlockPartRole =
  | 'pin'
  | 'wall-slot'
  | 'ceil-slot'
  | 'floor-slot'
  | 'load-on'
  | 'road-slot'
  | 'load-off'
  | 'wall-join'
  | 'transformer-holder';

type BlockPartLookupData = {
  hide?: boolean;
  isSelected?: boolean;
  isConnected?: boolean;
  joins?: [string, string];
  orientation: number;
  role?: 'slot';
  roles?: BlockPartRole[];
  type: 'placeholder' | 'phisycal';
};

export default BlockPartLookupData;
