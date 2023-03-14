#include "active_frame.h"

namespace spright { namespace editor {
	ActiveFrame::ActiveFrame(std::vector<FrameImpl>& frames, size_t activeFrameIndex) : m_Frames(frames), m_ActiveFrameIndex(activeFrameIndex), m_ActiveLayerIndex(0)
	{
		int a = 2;
		int b = 3;
		int &c = a;
		c = b;
	}

	ActiveFrame::~ActiveFrame() {
	}

	void ActiveFrame::addBackgroundLayer(const TileLayer& tileLayer)
	{
		m_BackgroundLayers.push_back(tileLayer);
	}

	ActiveFrame& ActiveFrame::operator=(const ActiveFrame& rhs) {

		m_ActiveFrameIndex = rhs.m_ActiveFrameIndex;
		m_ActiveLayerIndex = rhs.m_ActiveLayerIndex;
		m_BackgroundLayers = rhs.m_BackgroundLayers;
		m_ForegroundLayers = rhs.m_ForegroundLayers;

		return *this;
	}

	bool ActiveFrame::isValid() const {
		return m_ActiveFrameIndex != -1;
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
		return getActiveFrame().getLayerAtIndex(m_ActiveLayerIndex);
	}

	void ActiveFrame::setActiveLayer(const TileLayer& tileLayer)
	{
		m_ActiveLayerIndex = getLayerIndex(tileLayer);
	}

	TileLayer& ActiveFrame::getLayer(std::string id)
	{
		try {
			return getActiveFrame().getLayer(id);
		}
		catch (const std::exception&) {}


		try {
			return find_layer(id, m_BackgroundLayers);
		}
		catch (const std::exception&) {}

		return find_layer(id, m_ForegroundLayers);
	}

	TileLayer& ActiveFrame::addLayer(const TileLayer& layer)
	{
		getActiveFrame().getLayers().push_back(layer);
		return getActiveFrame().getLayers().back();
	}

	void ActiveFrame::insertLayer(const TileLayer& layer, size_t index) {
		getActiveFrame().getLayers().insert(getActiveFrame().getLayers().begin() + index, layer);
	}

	TileLayer& ActiveFrame::getLayerAtIndex(size_t index)
	{
		return *(getActiveFrame().getLayers().begin() + index);
	}

	std::vector<TileLayer>& ActiveFrame::getLayers() {
		return getActiveFrame().getLayers();
	}

	const std::vector<TileLayer>& ActiveFrame::getLayers() const
	{
		return getActiveFrame().getLayers();
	}

	void ActiveFrame::removeLayer(std::string layerId) {
		int index = getLayerIndex(getLayer(layerId));

		if (index != -1) {
			getActiveFrame().getLayers().erase(getActiveFrame().getLayers().begin() + index);
		}
	}

	size_t ActiveFrame::getLayerIndex(const TileLayer& tileLayer) const {
		int index = -1;

		auto it = find_if(getActiveFrame().getLayers().begin(), getActiveFrame().getLayers().end(), [&](const TileLayer& layer) { return layer.getId() == tileLayer.getId(); });

		if (it != getActiveFrame().getLayers().end()) {
			return it - getActiveFrame().getLayers().begin();
		}

		return -1;
	}

	size_t ActiveFrame::getIndex() const
	{
		return getActiveFrame().getIndex();
	}

	void ActiveFrame::setIndex(size_t index)
	{
		getActiveFrame().setIndex(index);
	}

	FrameImpl& ActiveFrame::getActiveFrame() const {
		if (!isValid()) {
			throw "No active frame";
		}

		return m_Frames[m_ActiveFrameIndex];
	}
}}
