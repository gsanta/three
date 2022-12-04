#include "document.h"

namespace spright_app { namespace document {

	spright_engine::graphics::Layer* findLayer(std::string id, std::vector<spright_engine::graphics::Layer*>& layers) {
		auto it = find_if(layers.begin(), layers.end(), [&id](spright_engine::graphics::Layer* layer) { return layer->getId() == id; });

		if (it != layers.end()) {
			return *it;
		}

		return nullptr;
	}

	Document::Document(spright_engine::graphics::Dimensions dimensions) : dimensions(dimensions)
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
		spright_engine::graphics::Layer* layer = findLayer(id, m_Layers);

		if (layer != nullptr) {
			return layer;
		}

		layer = findLayer(id, m_BeforeLayers);

		if (layer != nullptr) {
			return layer;
		}

		layer = findLayer(id, m_AfterLayers);

		if (layer != nullptr) {
			return layer;
		}
	}

	void Document::addUserLayer(spright_engine::graphics::Layer* layer)
	{
		m_Layers.push_back(layer);
	}

	void Document::addBeforeLayer(spright_engine::graphics::Layer* layer) {
		m_BeforeLayers.push_back(layer);
	}

	void Document::addAfterLayer(spright_engine::graphics::Layer* layer) {
		m_AfterLayers.push_back(layer);
	}

	std::vector<spright_engine::graphics::Layer*>& Document::getUserLayers() {
		return m_Layers;
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
		for (spright_engine::graphics::Layer* layer : m_BeforeLayers) {
			layer->render();
		}

		for (spright_engine::graphics::Layer* layer : m_Layers) {
			layer->render();
		}

		for (spright_engine::graphics::Layer* layer : m_AfterLayers) {
			layer->render();
		}
	}
}}
