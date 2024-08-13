import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import ElectricNode from '../../services/electricity/types/ElectricNode';
import { updateBlocks } from '../block/blockActions';
import ElectricityUpdater from './ElectricityUpdater';
import ElectricConnection from '../../services/electricity/types/ElectricConnection';

export type ElectricNodeInfo = {
  currentFlows: boolean;
  provider: string | null;
};

export type ElectricityState = {
  nodes: Record<string, ElectricNode>;
  connections: Record<string, ElectricConnection>;
};

export const initialElectricityState: ElectricityState = {
  nodes: {},
  connections: {},
};

export type ElectricNodeUpdate = {
  type: 'update' | 'remove';
  id: string;
} & (
  | {
      type: 'update';
      info: ElectricNodeInfo;
    }
  | {
      type: 'remove';
    }
);

const electricityUpdater = new ElectricityUpdater();

export const electricitySlice = createSlice({
  name: 'electricity',
  initialState: initialElectricityState,
  reducers: {
    updateElectricSystem(state: ElectricityState, action: PayloadAction<ElectricNodeUpdate[]>) {
      // const updates = action.payload;
      // updates.forEach((update) => {
      //   if (update.type === 'remove') {
      //     delete state.nodes[update.id];
      //   } else {
      //     const current = state.nodes[update.id];
      //     if (current?.currentFlows !== update.info.currentFlows || current.provider !== update.info.provider)
      //       state.nodes[update.id] = update.info;
      //   }
      // });
    },
  },

  extraReducers: (builder) => {
    builder.addCase(updateBlocks, (state, action) => {
      const electricityUpdates = action.payload.blockUpdates.filter((update) => update.store === 'electricity');

      electricityUpdater.update(state, electricityUpdates);
    });
  },
});

export const { updateElectricSystem } = electricitySlice.actions;

export default electricitySlice.reducer;
