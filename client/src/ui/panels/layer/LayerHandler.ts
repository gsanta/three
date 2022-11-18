import { action, computed, makeObservable, observable } from 'mobx';
import LayerAdapter from './LayerAdapter';

class LayerHandler {
  private layers: LayerAdapter[] = [];

  private activeLayer: LayerAdapter | undefined;

  constructor() {
    makeObservable<LayerHandler, 'layers' | 'activeLayer'>(this, {
      activeLayer: observable,
      addLayer: action,
      getLayerIndex: action,
      init: action,
      insertLayer: action,
      layers: observable,
      removeLayer: action,
      setActiveLayer: action,
    });
  }

  init() {
    this.addLayer(new LayerAdapter('layer 1'));
    this.addLayer(new LayerAdapter('layer 2'));
    this.addLayer(new LayerAdapter('layer 3'));
    this.addLayer(new LayerAdapter('layer 4'));

    this.setActiveLayer(this.layers[0]);
  }

  setActiveLayer(layer: LayerAdapter) {
    this.activeLayer = layer;
  }

  getActiveLayer() {
    return this.activeLayer;
  }

  addLayer(layer: LayerAdapter) {
    this.layers.push(layer);
  }

  insertLayer(layer: LayerAdapter, position: number) {
    this.layers.splice(position, 0, layer);
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
}

export default LayerHandler;
