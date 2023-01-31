#pragma once
#include <vector>
#include <set>
#include "../../engine/graphics/layer/layer.h"
#include "../../engine/graphics/layer/tileLayer.h"

namespace spright {
	using namespace ::engine::graphics;

	class LayerHandler {
	private:
		std::vector<Layer*> m_Layers;
		std::vector<Layer*> m_BeforeLayers;
		std::vector<Layer*> m_AfterLayers;

		std::set<Layer*> m_TileLayers;

		Layer* m_ActiveLayer;
	public:
		Layer* getLayer(std::string id);
		TileLayer* getTileLayer(std::string id);

		void addLayer(Layer* layer);
		void addLayer(TileLayer* tileLayer);
		std::vector<Layer*>& getLayers();
		void addBeforeLayer(Layer* layer);
		void addBeforeLayer(TileLayer* tileLayer);
		std::vector<Layer*>& getBeforeLayers();
		void addAfterLayer(Layer* layer);
		void addAfterLayer(TileLayer* tileLayer);
		std::vector<Layer*>& getAfterLayers();

		void setLayerIndex(std::string layerId, int newIndex);
		int getLayerIndex(std::string layerId);
		void removeLayer(std::string layerId);
		Layer* getActiveLayer();
		void setActiveLayer(std::string layerId);
	};

}