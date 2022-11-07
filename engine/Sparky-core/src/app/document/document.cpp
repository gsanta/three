#include "document.h"

namespace spright_app { namespace document {

	Document::Document(spright_app::document::Dimensions dimensions) : dimensions(dimensions)
	{
		//auto it = find_if(m_Layers.begin(), m_Layers.end(), [](spright_engine::graphics::Layer* layer) {
		//	return layer->getId().rfind(USER_LAYER_ID_PREFIX, 0) != std::string::npos; 
		//});

		//m_ActiveLayer = *it;
		m_Camera = new spright_engine::graphics::Camera();
		m_Camera->setProjectionInfo(spright_engine::graphics::OrthoProjectionInfo(dimensions.left, dimensions.right, dimensions.bottom, dimensions.top));
	}

	Document::~Document() {
		std::vector<spright_engine::graphics::Layer*>::iterator it;

		// TODO fix it
		//for (it = m_Layers.begin(); it != m_Layers.end(); ) {
		//	delete *it;
		//}
	}

	spright_engine::graphics::Layer* Document::getLayer(std::string id)
	{
		auto it = find_if(m_Layers.begin(), m_Layers.end(), [&id](spright_engine::graphics::Layer* layer) { return layer->getId() == id; });

		return *it;
	}

	void Document::addLayer(spright_engine::graphics::Layer* layer)
	{
		m_Layers.push_back(layer);
	}

	std::string Document::getJson()
	{
		nlohmann::json json = getActiveLayer()->getJson();

		return json.dump();
	}

	void Document::setActiveLayer(std::string id)
	{
		m_ActiveLayer = getLayer(id);
	}

	void Document::render()
	{
		for (spright_engine::graphics::Layer* layer : m_Layers) {
			layer->render();
		}
	}
}}
