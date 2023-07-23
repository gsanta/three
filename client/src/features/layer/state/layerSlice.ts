import Editor from '@/features/editor/Editor';
import EditorApi from '@/features/editor/EditorApi';
import ToolDescription from '@/features/editor/ToolDescription';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import Layer from './Layer';

interface LayerState {
  activeLayer: Layer | null;
  layers: Layer[];
  editor?: EditorApi;
}

const initialState: LayerState = {
  activeLayer: null,
  layers: [],
};

export const layerSlice = createSlice({
  name: 'layer',
  initialState,
  reducers: {
    createLayer: (state, action: PayloadAction<string>) => {
      const index = state.editor?.createLayer(action.payload) || 0;

      const layer: Layer = {
        name: action.payload,
        index,
        visible: true,
      };

      state.layers.push(layer);
    },

    initLayers: (state, action: PayloadAction<Editor>) => {
      const editor = action.payload;
      const layersList = editor.getLayers();
      const layersJson = new Array<string>(layersList.size()).fill('').map((_, index) => layersList.get(index));
      const layers = layersJson.map<ToolDescription>((layerJson) => JSON.parse(layerJson));
      state.layers = layers.map((layer) => ({ name: layer.name, index: layer.index, visible: true }));
      state.activeLayer = state.layers[0];
      state.editor = editor;
    },

    removeLayer: (state, action: PayloadAction<Layer>) => {
      const layer = action.payload;
      if (state.layers.length === 1) {
        return;
      }
      state.layers.splice(state.layers.indexOf(layer), 1);

      if (state.activeLayer === layer) {
        state.activeLayer = state.layers[0];
      }
      state.editor?.removeLayer(layer.index);
    },

    setActiveLayer: (state, action: PayloadAction<Layer>) => {
      state.activeLayer = action.payload;
      state.editor?.setActiveLayer(action.payload.index);
    },

    setLayerIndex: (state, action: PayloadAction<{ oldLayerIndex: number; newLayerIndex: number }>) => {
      const { oldLayerIndex, newLayerIndex } = action.payload;

      const layer = state.layers[oldLayerIndex];

      if (layer.index == -1 || layer.index == newLayerIndex) {
        return;
      }

      const finalLayerIndex = layer.index < newLayerIndex ? newLayerIndex - 1 : newLayerIndex;

      state.editor?.setLayerIndex(layer.index, finalLayerIndex);

      state.layers.splice(layer.index, 1);
      state.layers.splice(finalLayerIndex, 0, layer);
      state.layers = state.layers.map((l, index) => ({ ...l, index }));
    },

    setLayerVisible: (state, action: PayloadAction<{ index: number; visible: boolean }>) => {
      const { index, visible } = action.payload;
      state.layers[index].visible = visible;

      if (visible) {
        state.editor?.enableLayer(index);
      } else {
        state.editor?.disableLayer(index);
      }
    },
  },
});

export const { createLayer, initLayers, removeLayer, setActiveLayer, setLayerIndex, setLayerVisible } =
  layerSlice.actions;

export default layerSlice.reducer;
