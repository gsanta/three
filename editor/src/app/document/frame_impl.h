#pragma once
#include <vector>
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

		TileLayer& addLayer(const TileLayer& tileLayer) override;
		void insertLayer(const TileLayer& tileLayer, size_t index) override;
		void removeLayer(std::string layerId) override;
		TileLayer& getLayer(std::string id) override;
		TileLayer& getLayerAtIndex(size_t index) override;
		std::vector<TileLayer>& getLayers() override;
		const std::vector<TileLayer>& getLayers() const override;
		size_t getLayerIndex(const TileLayer& tileLayer) const override;
		size_t getIndex() const override;
		void setIndex(size_t index) override;
	};

	TileLayer& find_layer(std::string id, std::vector<TileLayer>& layers);
}}