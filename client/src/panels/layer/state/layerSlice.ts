import Editor from '@/services/editor/Editor';
import EditorApi from '@/services/editor/EditorApi';
import ToolDescription from '@/services/editor/ToolDescription';
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
      layers.forEach((layer) => state.layers.push({ name: layer.name, index: layer.index, visible: true }));
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

    setLayerIndex: (state, action: PayloadAction<{ layer: Layer; newLayerIndex: number }>) => {
      const { layer, newLayerIndex } = action.payload;
      const currentLayerIndex = state.layers.indexOf(layer);

      if (currentLayerIndex == -1 || currentLayerIndex == newLayerIndex) {
        return;
      }

      const finalLayerIndex = currentLayerIndex < newLayerIndex ? newLayerIndex - 1 : newLayerIndex;

      state.layers.splice(state.layers.indexOf(layer), 1);
      state.layers.splice(finalLayerIndex, 0, layer);

      state.editor?.setLayerIndex(layer.index, newLayerIndex);
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
