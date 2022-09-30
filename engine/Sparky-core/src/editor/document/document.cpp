#include "document.h"

namespace my_app { namespace editor { namespace document {

	Document::Document(std::vector<my_app::graphics::Layer*> layers)
		: m_Layers(layers)
	{
		auto it = find_if(m_Layers.begin(), m_Layers.end(), [](my_app::graphics::Layer* layer) {
			return layer->getId().rfind(USER_LAYER_ID_PREFIX, 0) != std::string::npos; 
		});

		m_ActiveLayer = *it;
	}

	Document::~Document() {
		std::vector<my_app::graphics::Layer*>::iterator it;

		for (it = m_Layers.begin(); it != m_Layers.end(); ) {
			delete *it;
		}
	}

	my_app::graphics::Layer* Document::getLayer(std::string id)
	{
		auto it = find_if(m_Layers.begin(), m_Layers.end(), [&id](my_app::graphics::Layer* layer) { return layer->getId() == id; });

		return *it;
	}

	void Document::render()
	{
		for (my_app::graphics::Layer* layer : m_Layers) {
			layer->render();
		}
	}
}}}
