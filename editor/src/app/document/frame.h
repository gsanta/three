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
		TileLayer& getLayer(std::string id);
		std::vector<TileLayer>& getLayers();

		void setLayerIndex(std::string layerId, int newIndex);
		int getLayerIndex(std::string layerId);
		void removeLayer(std::string layerId);
	};
}}