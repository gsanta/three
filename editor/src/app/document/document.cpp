#include "document.h"

namespace spright { namespace document {

	engine::graphics::Layer* findLayer(std::string id, std::vector<engine::graphics::Layer*>& layers) {
		auto it = find_if(layers.begin(), layers.end(), [&id](engine::graphics::Layer* layer) { return layer->getId() == id; });

		if (it != layers.end()) {
			return *it;
		}

		return nullptr;
	}

	Document::Document(engine::graphics::Dimensions dimensions, Camera* camera, Canvas* canvas) : dimensions(dimensions), m_Camera(camera), m_Canvas(canvas)
	{
		m_LayerHandler = std::make_unique<LayerHandler>();
		//auto it = find_if(m_Layers.begin(), m_Layers.end(), [](engine::graphics::Layer* layer) {
		//	return layer->getId().rfind(USER_LAYER_ID_PREFIX, 0) != std::string::npos; 
		//});

		//m_ActiveLayer = *it;
	}

	Document::~Document() {
		std::vector<engine::graphics::Layer*>::iterator it;

		delete m_Camera;
		delete m_Canvas;
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
		for (engine::graphics::Layer* layer : getLayerHandler()->getBeforeLayers()) {
			layer->render();
		}

		for (engine::graphics::Layer* layer : getLayerHandler()->getLayers()) {
			layer->render();
		}

		for (engine::graphics::Layer* layer : getLayerHandler()->getAfterLayers()) {
			layer->render();
		}
	}
}}
