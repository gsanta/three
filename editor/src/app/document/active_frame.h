#pragma once
#include "./frame.h"

namespace spright { namespace editor {

	class ActiveFrame : public Frame {
	private:
		std::vector<TileLayer> m_BackgroundLayers;
		std::vector<TileLayer> m_ForegroundLayers;
	public:
		void addBackgroundLayer(const TileLayer& tileLayer);
		std::vector<TileLayer>& getBackgroundLayers();
		void addForegroundLayer(const TileLayer& tileLayer);
		std::vector<TileLayer>& getForegroundLayers();

		TileLayer& getLayer(std::string id) override;
	};
}}