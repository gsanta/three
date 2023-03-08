#pragma once
#include <vector>
#include "../../engine/graphics/layer/tileLayer.h"

namespace spright { namespace editor {
	using namespace engine;

	class Frame {
	public:
		virtual void addLayer(const TileLayer& tileLayer) = 0;
		virtual void insertLayer(const TileLayer& tileLayer, size_t index) = 0;
		virtual void removeLayer(std::string layerId) = 0;
		virtual TileLayer& getLayer(std::string id) = 0;
		virtual TileLayer& getLayerAtIndex(size_t index) = 0;
		virtual std::vector<TileLayer>& getLayers() = 0;
		virtual const std::vector<TileLayer>& getLayers() const = 0;
		virtual size_t getLayerIndex(const TileLayer& tileLayer) const = 0;
		virtual size_t getIndex() const = 0;
		virtual void setIndex(size_t index) = 0;
	};
}}