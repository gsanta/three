#include "drawing.h"

namespace spright { namespace editor {

	Drawing::Drawing(Bounds bounds, Camera* camera, EventEmitter* eventEmitter) : Container(bounds), m_Camera(camera), m_EventEmitter(eventEmitter)
	{
		m_FramePlayer = std::make_unique<FramePlayer>(m_FrameStore, eventEmitter);
	}

	Drawing::~Drawing() {
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
		// check bounds
		m_FrameStore.getActiveFrame().addLayer(tileLayer);
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

	void Drawing::render()
	{
		for (TileLayer& layer : getActiveFrame().getBackgroundLayers()) {
			layer.render(m_Camera);
		}

		for (TileLayer& layer : getActiveFrame().getLayers()) {
			layer.render(m_Camera);
		}

		for (TileLayer& layer : getActiveFrame().getForegroundLayers()) {
			layer.render(m_Camera);
		}
	}

	FramePlayer& Drawing::getFramePlayer() {
		return *m_FramePlayer;
	}
}}
