#pragma once
#include "./frame.h"
#include "./frame_impl.h"
#include "../../engine/graphics/layer/tileLayer.h"

namespace spright { namespace editor {

	class ActiveFrame : public Frame {
	private:
		std::vector<TileLayer> m_BackgroundLayers;
		std::vector<TileLayer> m_ForegroundLayers;

		Frame* m_Frame = nullptr;
		TileLayer* m_ActiveLayer = nullptr;
	public:
		ActiveFrame(Frame& frame, int activeLayerIndex = 0);
		ActiveFrame();

		ActiveFrame& operator=(const ActiveFrame& rhs);

		bool isValid() const;

		void addLayer(const TileLayer& tileLayer) override;
		void insertLayer(const TileLayer& tileLayer, size_t index) override;
		void removeLayer(std::string layerId) override;
		TileLayer& getLayer(std::string id) override;
		TileLayer& getLayerAtIndex(size_t index) override;
		std::vector<TileLayer>& getLayers() override;
		const std::vector<TileLayer>& getLayers() const override;
		size_t getLayerIndex(const TileLayer& tileLayer) const override;
		size_t getIndex() const override;
		void setIndex(size_t index) override;

		void addBackgroundLayer(const TileLayer& tileLayer);
		std::vector<TileLayer>& getBackgroundLayers();
		void addForegroundLayer(const TileLayer& tileLayer);
		std::vector<TileLayer>& getForegroundLayers();
		TileLayer& getActiveLayer();
		void setActiveLayer(const TileLayer& tileLayer);
	};
}}