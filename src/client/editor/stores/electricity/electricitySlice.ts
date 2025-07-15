import { createSlice } from '@reduxjs/toolkit';
import ElectricSupplierDecorator from '../../models/block/categories/ElectricSupplierDecorator';
import { updateBlocks } from '../block/blockActions';
import ElectricityUpdater from './ElectricityUpdater';

export type ElectricNode = {
  blockId: string;
};

export type ElectricConnection = {
  from: string;
  to: string;
};

export type ElectricityState = {
  nodes: Partial<Record<string, ElectricNode>>;

  sources: Record<string, object>;
  decorations: {
    'electric-supplier': Partial<Record<string, ElectricSupplierDecorator>>;
  };
};

export const initialElectricityState: ElectricityState = {
  nodes: {},
  sources: {},
  decorations: {
    'electric-supplier': {},
  },
};

export type ElectricNodeUpdate = {
  type: 'update' | 'remove';
  id: string;
} & (
  | {
      type: 'update';
      info: ElectricNode;
    }
  | {
      type: 'remove';
    }
);

const electricityUpdater = new ElectricityUpdater();

export const electricitySlice = createSlice({
  name: 'settings',
  initialState: initialElectricityState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(updateBlocks, (state, action) => {
      // if (action.payload.history) {
      //   history.push(structuredClone(current(state)));
      // }

      electricityUpdater.update(state, action.payload.blockUpdates);
    });
  },
});

export const { updateElectricSystem } = electricitySlice.actions;

export default electricitySlice.reducer;
