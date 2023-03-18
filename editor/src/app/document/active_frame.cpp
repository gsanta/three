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

	bool ActiveFrame::isEqual(const Frame& rhs) const {
		throw "isEqual not implemented in ActiveFrame";
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
		return getActiveFrame().getLayer(m_ActiveLayerIndex);
	}

	void ActiveFrame::setActiveLayer(size_t layerIndex)
	{
		if (layerIndex >= getActiveFrame().getLayers().size()) {
			throw std::invalid_argument("No frame at index " + layerIndex);
		}

		m_ActiveLayerIndex = layerIndex;
	}

	TileLayer& ActiveFrame::addLayer(const TileLayer& layer)
	{
		TileLayer& newLayer = getActiveFrame().addLayer(layer);

		if (getActiveFrame().getLayers().size() == 1) {
			setActiveLayer(0);
		}

		return newLayer;
	}

	void ActiveFrame::insertLayer(const TileLayer& layer, size_t index) {
		getActiveFrame().insertLayer(layer, index);
	}

	TileLayer& ActiveFrame::getLayer(size_t index)
	{
		return getActiveFrame().getLayer(index);
	}

	std::vector<TileLayer>& ActiveFrame::getLayers() {
		return getActiveFrame().getLayers();
	}

	const std::vector<TileLayer>& ActiveFrame::getLayers() const
	{
		return getActiveFrame().getLayers();
	}

	void ActiveFrame::removeLayer(size_t layerIndex) {
		getActiveFrame().removeLayer(layerIndex);
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

	nlohmann::json ActiveFrame::getLayerDescription() const {
		return getActiveFrame().getLayerDescription();
	}
}}
