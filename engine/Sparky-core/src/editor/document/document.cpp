#include "document.h"

namespace my_app { namespace editor { namespace document {

	Document::Document(my_app_editor::document::Dimensions dimensions) : dimensions(dimensions)
	{
		//auto it = find_if(m_Layers.begin(), m_Layers.end(), [](my_app_engine::graphics::Layer* layer) {
		//	return layer->getId().rfind(USER_LAYER_ID_PREFIX, 0) != std::string::npos; 
		//});

		//m_ActiveLayer = *it;
		m_Camera = new my_app_engine::graphics::Camera();
	}

	Document::~Document() {
		std::vector<my_app_engine::graphics::Layer*>::iterator it;

		// TODO fix it
		//for (it = m_Layers.begin(); it != m_Layers.end(); ) {
		//	delete *it;
		//}
	}

	my_app_engine::graphics::Layer* Document::getLayer(std::string id)
	{
		auto it = find_if(m_Layers.begin(), m_Layers.end(), [&id](my_app_engine::graphics::Layer* layer) { return layer->getId() == id; });

		return *it;
	}

	void Document::addLayer(my_app_engine::graphics::Layer* layer)
	{
		m_Layers.push_back(layer);
	}

	void Document::setActiveLayer(std::string id)
	{
		m_ActiveLayer = getLayer(id);
	}

	void Document::render()
	{
		for (my_app_engine::graphics::Layer* layer : m_Layers) {
			layer->render();
		}
	}
}}}
