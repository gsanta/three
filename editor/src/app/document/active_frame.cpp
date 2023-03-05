#include "active_frame.h"

namespace spright { namespace editor {

	void ActiveFrame::addBackgroundLayer(const TileLayer& tileLayer)
	{
		m_BackgroundLayers.push_back(tileLayer);
	}

	std::vector<TileLayer>& ActiveFrame::getBackgroundLayers()
	{
		return m_BackgroundLayers;
	}

	void ActiveFrame::addForegroundLayer(const TileLayer& tileLayer)
	{
		m_ForegroundLayers.push_back(tileLayer);
	}
	std::vector<TileLayer>& ActiveFrame::getForegroundLayers()
	{
		return m_ForegroundLayers;
	}

	TileLayer& ActiveFrame::getLayer(std::string id)
	{
		try {
			return Frame::getLayer(id);
		}
		catch (const std::exception&) {}

		try {
			return find_layer(id, m_BackgroundLayers);
		}
		catch (const std::exception&) {}

		return find_layer(id, m_ForegroundLayers);
	}
}}