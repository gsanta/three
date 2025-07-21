import { createSlice, current } from '@reduxjs/toolkit';
import ElectricSupplierDecorator from '../../models/block/categories/ElectricSupplierDecorator';
import { historyAction, redoAction, undoAction, updateBlocks } from '../block/blockActions';
import ElectricityUpdater from './ElectricityUpdater';
import ElectricConsumerDecorator from '../../models/block/categories/ElectricConsumerDecorator';
import { BlockState } from '../block/blockSlice.types';
import HistoryStorage from '../utils/HistoryStorage';

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
  decorators: {
    'electric-supplier': Partial<Record<string, ElectricSupplierDecorator>>;
    'electric-consumer': Partial<Record<string, ElectricConsumerDecorator>>;
  };
};

export const initialElectricityState: ElectricityState = {
  nodes: {},
  sources: {},
  decorators: {
    'electric-supplier': {},
    'electric-consumer': {},
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

const history = new HistoryStorage<ElectricityState>(HistoryStorage.MAX_DEPTH);

const overwriteState = (writableState: ElectricityState, newState: ElectricityState) => {
  writableState.nodes = newState.nodes;
  writableState.sources = newState.sources;
  writableState.decorators = newState.decorators;
};


export const electricitySlice = createSlice({
  name: 'settings',
  initialState: initialElectricityState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(updateBlocks, (state, action) => {
      electricityUpdater.update(state, action.payload.blockUpdates);
    });

    builder.addCase(historyAction, (state) => {
      history.push(structuredClone(current(state)));
    });

    builder.addCase(undoAction, (state) => {
      const previousState = history.undo(structuredClone(current(state)));

      overwriteState(state, previousState);
    });

    builder.addCase(redoAction, (state) => {
      const previousState = history.redo(structuredClone(current(state)));

      overwriteState(state, previousState);
    });

    // for debugging purposes
    builder.addMatcher(
      () => true,
      (state) => {
        if (typeof window !== 'undefined') {
          (window as any).electricityState = current(state);
        }
      },
    );
  },
});

export const { updateElectricSystem } = electricitySlice.actions;

export default electricitySlice.reducer;
