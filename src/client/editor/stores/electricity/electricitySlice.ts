import { PayloadAction, createSlice } from '@reduxjs/toolkit';

type ElectricSource = {};

export type ElectricNodeInfo = {
  currentFlows: boolean;
  provider: string | null;
};

export type ElectricityState = {
  nodes: Partial<Record<string, ElectricNodeInfo>>;

  sources: Record<string, ElectricSource>;
};

export const initialElectricityState: ElectricityState = {
  nodes: {},
  sources: {},
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

export const electricitySlice = createSlice({
  name: 'settings',
  initialState: initialElectricityState,
  reducers: {
    updateElectricSystem(state: ElectricityState, action: PayloadAction<ElectricNodeUpdate[]>) {
      const updates = action.payload;

      updates.forEach((update) => {
        if (update.type === 'remove') {
          delete state.nodes[update.id];
        } else {
          const current = state.nodes[update.id];

          if (current?.currentFlows !== update.info.currentFlows || current.provider !== update.info.provider)
            state.nodes[update.id] = update.info;
        }
      });
    },
  },
});

export const { updateElectricSystem } = electricitySlice.actions;

export default electricitySlice.reducer;
