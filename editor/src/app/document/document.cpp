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

	std::string Document::getJson()
	{
		nlohmann::json json = getLayerHandler()->getActiveLayer()->getJson();

		return json.dump();
	}

	LayerHandler* Document::getLayerHandler() {
		return m_LayerHandler.get();
	}

	void Document::render()
	{
		for (TileLayer* layer : getLayerHandler()->getBeforeLayers()) {
			layer->render(m_Camera);
		}

		for (TileLayer* layer : getLayerHandler()->getLayers()) {
			layer->render(m_Camera);
		}

		for (TileLayer* layer : getLayerHandler()->getAfterLayers()) {
			layer->render(m_Camera);
		}
	}
}}
