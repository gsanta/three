#pragma once
#include <vector>
#include "../../engine/graphics/layer/layer.h"

namespace spright {
	using namespace ::engine::graphics;

	class LayerHandler {
	private:
		std::vector<Layer*> m_Layers;
		std::vector<Layer*> m_BeforeLayers;
		std::vector<Layer*> m_AfterLayers;

		Layer* m_ActiveLayer;
	public:
		Layer* getLayer(std::string id);

		void addSortedLayer(Layer* layer);
		std::vector<Layer*>& getSortedLayers();
		void addBeforeLayer(Layer* layer);
		std::vector<Layer*>& getBeforeLayers();
		void addAfterLayer(Layer* layer);
		std::vector<Layer*>& getAfterLayers();

		void setLayerIndex(std::string layerId, int newIndex);
		int getLayerIndex(std::string layerId);
		void removeLayer(std::string layerId);
		Layer* getActiveLayer();
		void setActiveLayer(std::string layerId);
	};

}