#pragma once
#include <vector>
#include <nlohmann/json.hpp>
#include "./frame.h"
#include "../../engine/graphics/layer/tileLayer.h"

namespace spright { namespace editor {
	using namespace engine;

	class FrameImpl : public Frame {
	private:
		size_t m_Index;
	protected:
		std::vector<TileLayer> m_Layers;
	public:
		FrameImpl();
		FrameImpl(size_t index);
		FrameImpl(const Frame&);

		bool isEqual(const Frame&) const override;
		TileLayer& addLayer(const TileLayer& tileLayer) override;
		void insertLayer(const TileLayer& tileLayer, size_t index) override;
		void removeLayer(size_t layerIndex) override;
		TileLayer& getLayer(size_t index) override;
		std::vector<TileLayer>& getLayers() override;
		const std::vector<TileLayer>& getLayers() const override;
		size_t getIndex() const override;
		void setIndex(size_t index) override;
		nlohmann::json getJson() const override;
	private:
		void resetLayerIndexes();
	};

	TileLayer& find_layer(std::string id, std::vector<TileLayer>& layers);
}}