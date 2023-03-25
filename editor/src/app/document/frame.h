#pragma once
#include <vector>
#include <nlohmann/json.hpp>
#include "../../engine/graphics/layer/tileLayer.h"

namespace spright { namespace editor {
	using namespace engine;

	class Frame {
	public:

		friend bool operator==(const Frame&, const Frame&);
		friend bool operator!=(const Frame&, const Frame&);
		virtual bool isEqual(const Frame&) const = 0;
		virtual TileLayer& addLayer(const TileLayer& tileLayer) = 0;
		virtual void insertLayer(const TileLayer& tileLayer, size_t index) = 0;
		virtual void removeLayer(size_t layerIndex) = 0;
		virtual TileLayer& getLayer(size_t index) = 0;
		virtual std::vector<TileLayer>& getLayers() = 0;
		virtual const std::vector<TileLayer>& getLayers() const = 0;
		virtual size_t getIndex() const = 0;
		virtual void setIndex(size_t index) = 0;
		virtual nlohmann::json getJson() const = 0;
	};

	inline bool operator==(const Frame& lhs, const Frame& rhs) {
		return typeid(lhs) == typeid(rhs) && lhs.isEqual(rhs);
	}

	inline bool operator!=(const Frame& lhs, const Frame& rhs) {
		return !(lhs.isEqual(rhs));
	}
}}