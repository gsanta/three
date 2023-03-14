#include "document.h"

namespace spright { namespace editor {

	Document::Document(Dimensions dimensions, Camera* camera) : Container(dimensions), m_Camera(camera)
	{
		m_LayerHandler = std::make_unique<LayerHandler>();
		//auto it = find_if(m_Layers.begin(), m_Layers.end(), [](Layer* layer) {
		//	return layer->getId().rfind(USER_LAYER_ID_PREFIX, 0) != std::string::npos; 
		//});

		//m_ActiveLayer = *it;
	}

	Document::~Document() {
		std::vector<Group<Rect2D>*>::iterator it;

		delete m_Camera;
		// TODO fix it
		//for (it = m_Layers.begin(); it != m_Layers.end(); ) {
		//	delete *it;
		//}
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
}}
