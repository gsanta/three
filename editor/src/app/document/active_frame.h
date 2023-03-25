#pragma once
#include <nlohmann/json.hpp>
#include "./frame.h"
#include "./frame_impl.h"
#include "../../engine/graphics/layer/tileLayer.h"

namespace spright { namespace editor {

	class ActiveFrame : public Frame {
	private:
		std::vector<TileLayer> m_BackgroundLayers;
		std::vector<TileLayer> m_ForegroundLayers;

		std::vector<FrameImpl>& m_Frames;
		size_t m_ActiveFrameIndex;
		size_t m_ActiveLayerIndex;
	public:
		ActiveFrame(std::vector<FrameImpl>& frames, size_t activeFrameIndex = -1);
		~ActiveFrame();

		ActiveFrame& operator=(const ActiveFrame& rhs);

		bool isEqual(const Frame& rhs) const override;

		bool isValid() const;

		TileLayer& addLayer(const TileLayer& tileLayer) override;
		void insertLayer(const TileLayer& tileLayer, size_t index) override;
		void removeLayer(size_t layerIndex) override;
		TileLayer& getLayer(size_t index) override;
		std::vector<TileLayer>& getLayers() override;
		const std::vector<TileLayer>& getLayers() const override;
		size_t getIndex() const override;
		void setIndex(size_t index) override;

		void addBackgroundLayer(const TileLayer& tileLayer);
		std::vector<TileLayer>& getBackgroundLayers();
		void addForegroundLayer(const TileLayer& tileLayer);
		std::vector<TileLayer>& getForegroundLayers();
		TileLayer& getActiveLayer();
		void setActiveLayer(size_t layerIndex);
		nlohmann::json getJson() const override;
	private:
		FrameImpl& getActiveFrame() const;
	};
}}