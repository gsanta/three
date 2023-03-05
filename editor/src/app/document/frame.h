#pragma once
#include <vector>
#include "../../engine/graphics/layer/tileLayer.h"

namespace spright { namespace editor {
	using namespace engine;

	class Frame {
	private:
		std::vector<TileLayer> m_Layers;
	public:

		void addLayer(const TileLayer& tileLayer);
		void insertLayer(const TileLayer& tileLayer, size_t index);
		void removeLayer(std::string layerId);
		virtual TileLayer& getLayer(std::string id);
		std::vector<TileLayer>& getLayers();
		int getLayerIndex(const TileLayer& tileLayer) const;
	};

	TileLayer& find_layer(std::string id, std::vector<TileLayer>& layers);
}}