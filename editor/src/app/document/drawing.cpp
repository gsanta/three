#include "drawing.h"

namespace spright { namespace editor {

	Drawing::Drawing(Bounds bounds, EventEmitter* eventEmitter) : Container(bounds), m_EventEmitter(eventEmitter)
	{
		m_FramePlayer = new FramePlayer(m_FrameStore, eventEmitter);
	}

	Drawing::Drawing(const Drawing& other) : Container(other.getBounds()), m_EventEmitter(other.m_EventEmitter) {
		m_FrameStore = other.m_FrameStore;
		m_FramePlayer = new FramePlayer(m_FrameStore, m_EventEmitter);
	}

	Drawing::~Drawing() {
		delete m_FramePlayer;
	}

	FrameStore& Drawing::getFrameStore() {
		return m_FrameStore;
	}

	ActiveFrame& Drawing::getActiveFrame() {
		return m_FrameStore.getActiveFrame();
	}

	TileLayer& Drawing::addLayer(const TileLayer& tileLayer) {
		if (getBounds() != tileLayer.getBounds()) {
			throw std::invalid_argument("Can not add a TileLayer to a Drawing with different bounds");
		}

		ActiveFrame& frame = m_FrameStore.getActiveFrame();
		// check bounds
		return frame.addLayer(tileLayer);
	}

	TileLayer& Drawing::getActiveLayer() {
		return getFrameStore().getActiveFrame().getActiveLayer();
	}

	TileLayer& Drawing::getForegroundLayer()
	{
		return m_FrameStore.getActiveFrame().getForegroundLayers()[0];
	}

	TileLayer& Drawing::getBackgroundLayer()
	{
		return m_FrameStore.getActiveFrame().getBackgroundLayers()[0];
	}

	std::string Drawing::getJson()
	{
		nlohmann::json json = m_FrameStore.getActiveFrame().getActiveLayer().getJson();

		return json.dump();
	}

	void Drawing::render(const Camera& camera)
	{
		for (TileLayer& layer : getActiveFrame().getBackgroundLayers()) {
			layer.render(camera);
		}

		for (TileLayer& layer : getActiveFrame().getLayers()) {
			layer.render(camera);
		}

		for (TileLayer& layer : getActiveFrame().getForegroundLayers()) {
			layer.render(camera);
		}
	}

	FramePlayer& Drawing::getFramePlayer() {
		return *m_FramePlayer;
	}
}}
