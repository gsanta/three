#pragma once
#include <vector>
#include <set>
#include "../../engine/graphics/layer/group.h"
#include "../../engine/graphics/layer/tileLayer.h"


namespace spright { namespace editor {
	using namespace ::spright::engine;

	class LayerHandler {
	private:
		std::vector<TileLayer*> m_SortableLayers;
		std::vector<TileLayer*> m_BeforeLayers;
		std::vector<TileLayer*> m_AfterLayers;

		std::set<TileLayer*> m_AllLayers;

		TileLayer* m_ActiveLayer;
	public:
		TileLayer* getLayer(std::string id);
		TileLayer* getTileLayer(std::string id);

		void addLayer(TileLayer* tileLayer);
		std::vector<TileLayer*>& getLayers();
		void addBeforeLayer(TileLayer* tileLayer);
		std::vector<TileLayer*>& getBeforeLayers();
		void addAfterLayer(TileLayer* tileLayer);
		std::vector<TileLayer*>& getAfterLayers();

		void setLayerIndex(std::string layerId, int newIndex);
		int getLayerIndex(std::string layerId);
		void removeLayer(std::string layerId);
		TileLayer* getActiveLayer();
		void setActiveLayer(std::string layerId);
	};

}}