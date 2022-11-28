import EditorApi from '@/services/api/EditorApi';
import { action, makeObservable, observable } from 'mobx';
import LayerAdapter from './LayerAdapter';
import { v4 as uuidv4 } from 'uuid';

class LayerHandler {
  private layers: LayerAdapter[] = [];

  private activeLayer: LayerAdapter | undefined;

  private editorApi: EditorApi;

  constructor(editorApi: EditorApi) {
    this.editorApi = editorApi;
    makeObservable<LayerHandler, 'layers' | 'activeLayer'>(this, {
      activeLayer: observable,
      createLayer: action,
      getLayerIndex: action,
      init: action,
      insertLayer: action,
      layers: observable,
      removeLayer: action,
      setActiveLayer: action,
    });
  }

  init() {
    this.editorApi
      .getLayers()
      .forEach((layer) => this.addLayer(new LayerAdapter(layer.name, layer.id, this.editorApi)));

    this.setActiveLayer(this.layers[0]);
  }

  setActiveLayer(layer: LayerAdapter) {
    this.editorApi.setActiveLayer(layer.getId());
    this.activeLayer = layer;
  }

  getActiveLayer() {
    return this.activeLayer;
  }

  createLayer(layerName: string) {
    const layer = new LayerAdapter(layerName, uuidv4(), this.editorApi);
    this.editorApi.createLayer(layer.getName(), layer.getId());
    this.addLayer(layer);
  }

  insertLayer(layer: LayerAdapter, position: number) {
    this.layers.splice(position, 0, layer);
  }

  moveLayer(layer: LayerAdapter, newLayerIndex: number) {
    const currentLayerIndex = this.getLayerIndex(layer);

    if (currentLayerIndex == -1 || currentLayerIndex == newLayerIndex) {
      return;
    }

    const finalLayerIndex = currentLayerIndex < newLayerIndex ? newLayerIndex - 1 : newLayerIndex;

    this.layers.splice(this.layers.indexOf(layer), 1);
    this.layers.splice(finalLayerIndex, 0, layer);
  }

  getLayerIndex(layer: LayerAdapter) {
    return this.layers.indexOf(layer);
  }

  removeLayer(layer: LayerAdapter) {
    if (this.layers.length === 1) {
      return;
    }
    this.layers.splice(this.layers.indexOf(layer), 1);

    if (this.activeLayer === layer) {
      this.activeLayer = this.layers[0];
    }
  }

  getLayers() {
    return this.layers;
  }

  private addLayer(layer: LayerAdapter) {
    this.layers.push(layer);
  }
}

export default LayerHandler;
