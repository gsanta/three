#include "document.h"

namespace spright { namespace editor {

	Document::Document(Bounds bounds, Camera* camera, EventEmitter* eventEmitter) : Container(bounds), m_Camera(camera), m_EventEmitter(eventEmitter)
	{
		m_FramePlayer = std::make_unique<FramePlayer>(m_FrameStore, eventEmitter);
	}

	Document::~Document() {
		std::vector<Group<Rect2D>*>::iterator it;

		delete m_Camera;
	}

	FrameStore& Document::getFrameStore() {
		return m_FrameStore;
	}

	ActiveFrame& Document::getActiveFrame() {
		return m_FrameStore.getActiveFrame();
	}


	TileLayer& Document::getActiveLayer() {
		return getFrameStore().getActiveFrame().getActiveLayer();
	}


	std::string Document::getJson()
	{
		nlohmann::json json = m_FrameStore.getActiveFrame().getActiveLayer().getJson();

		return json.dump();
	}

	void Document::render()
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

	FramePlayer& Document::getFramePlayer() {
		return *m_FramePlayer;
	}
}}
