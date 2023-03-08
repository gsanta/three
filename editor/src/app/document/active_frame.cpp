#include "active_frame.h"

namespace spright { namespace editor {
	ActiveFrame::ActiveFrame(Frame& frame, int activeLayerIndex) : m_Frame(frame), m_ActiveLayer(frame.getLayerAtIndex(activeLayerIndex))
	{
	}

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

	TileLayer& ActiveFrame::getActiveLayer()
	{
		return m_ActiveLayer;
	}

	void ActiveFrame::setActiveLayer(const TileLayer& tileLayer)
	{
		m_ActiveLayer = getLayer(tileLayer.getId());
	}

	TileLayer& ActiveFrame::getLayer(std::string id)
	{
		try {
			return m_Frame.getLayer(id);
		}
		catch (const std::exception&) {}

		try {
			return find_layer(id, m_BackgroundLayers);
		}
		catch (const std::exception&) {}

		return find_layer(id, m_ForegroundLayers);
	}

	void ActiveFrame::addLayer(const TileLayer& layer)
	{
		m_Frame.getLayers().push_back(layer);
	}

	void ActiveFrame::insertLayer(const TileLayer& layer, size_t index) {
		m_Frame.getLayers().insert(m_Frame.getLayers().begin() + index, layer);
	}

	TileLayer& ActiveFrame::getLayerAtIndex(size_t index)
	{
		return *(m_Frame.getLayers().begin() + index);
	}

	std::vector<TileLayer>& ActiveFrame::getLayers() {
		return m_Frame.getLayers();
	}

	const std::vector<TileLayer>& ActiveFrame::getLayers() const
	{
		return m_Frame.getLayers();
	}

	void ActiveFrame::removeLayer(std::string layerId) {
		int index = getLayerIndex(getLayer(layerId));

		if (index != -1) {
			m_Frame.getLayers().erase(m_Frame.getLayers().begin() + index);
		}
	}

	size_t ActiveFrame::getLayerIndex(const TileLayer& tileLayer) const {
		int index = -1;

		auto it = find_if(m_Frame.getLayers().begin(), m_Frame.getLayers().end(), [&](const TileLayer& layer) { return layer.getId() == tileLayer.getId(); });

		if (it != m_Frame.getLayers().end()) {
			return it - m_Frame.getLayers().begin();
		}

		return -1;
	}

	size_t ActiveFrame::getIndex() const
	{
		return m_Frame.getIndex();
	}

	void ActiveFrame::setIndex(size_t index)
	{
		m_Frame.setIndex(index);
	}
}}