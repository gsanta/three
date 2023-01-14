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

	engine::graphics::Layer* Document::getLayer(std::string id)
	{
		engine::graphics::Layer* layer = findLayer(id, m_Layers);

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

	void Document::addUserLayer(engine::graphics::Layer* layer)
	{
		m_Layers.push_back(layer);
	}

	void Document::setLayerIndex(std::string layerId, int newIndex) {
		int oldIndex = getLayerIndex(layerId);

		if (oldIndex < newIndex) {
			newIndex -= 1;
		}

		Layer* layer = getLayer(layerId);

		if (layer != nullptr) {
			m_Layers.erase(m_Layers.begin() + oldIndex);
			m_Layers.insert(m_Layers.begin() + newIndex, layer);
		}
	}

	void Document::removeLayer(std::string layerId) {
		int index = getLayerIndex(layerId);


		if (index != -1) {
			m_Layers.erase(m_Layers.begin() + index);
		}

		if (index != -1 && m_Layers.size() > 1) {
			Layer* layer = getLayer(layerId);

			bool shouldUpdateActiveLayer = false;

			if (layer == m_ActiveLayer) {
				shouldUpdateActiveLayer = true;
			}

			m_Layers.erase(m_Layers.begin() + index);

			if (shouldUpdateActiveLayer) {
				m_ActiveLayer = m_Layers[0];
			}
		}
	}

	int Document::getLayerIndex(std::string layerId) {
		int index = -1;

		auto it = find_if(m_Layers.begin(), m_Layers.end(), [&](Layer* layer) { return layer->getId() == layerId; });

		if (it != m_Layers.end()) {
			return it - m_Layers.begin();
		}

		return -1;
	}

	void Document::addBeforeLayer(engine::graphics::Layer* layer) {
		m_BeforeLayers.push_back(layer);
	}

	void Document::addAfterLayer(engine::graphics::Layer* layer) {
		m_AfterLayers.push_back(layer);
	}

	std::vector<engine::graphics::Layer*>& Document::getUserLayers() {
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
		for (engine::graphics::Layer* layer : m_BeforeLayers) {
			layer->render();
		}

		for (engine::graphics::Layer* layer : m_Layers) {
			layer->render();
		}

		for (engine::graphics::Layer* layer : m_AfterLayers) {
			layer->render();
		}
	}
}}
