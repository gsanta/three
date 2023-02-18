 #include "./layer_handler.h"

namespace spright { namespace editor {
	TileLayer* findLayer(std::string id, std::vector<TileLayer*>& layers) {
		auto it = find_if(layers.begin(), layers.end(), [&id](TileLayer* layer) { return layer->getId() == id; });

		if (it != layers.end()) {
			return *it;
		}

		return nullptr;
	}

	TileLayer* LayerHandler::getLayer(std::string id)
	{
		TileLayer* layer = findLayer(id, m_SortableLayers);

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

	TileLayer* LayerHandler::getTileLayer(std::string id) {
		TileLayer* layer = getLayer(id);

		if (m_AllLayers.find(layer) != m_AllLayers.end()) {
			return static_cast<TileLayer*>(layer);
		}

		return nullptr;
	}

	void LayerHandler::addLayer(TileLayer* layer)
	{
		m_SortableLayers.push_back(layer);
		m_AllLayers.insert(layer);
	}

	std::vector<TileLayer*>& LayerHandler::getLayers() {
		return m_SortableLayers;
	}

	void LayerHandler::setLayerIndex(std::string layerId, int newIndex) {
		int oldIndex = getLayerIndex(layerId);

		if (oldIndex < newIndex) {
			newIndex -= 1;
		}

		TileLayer* layer = getLayer(layerId);

		if (layer != nullptr) {
			m_SortableLayers.erase(m_SortableLayers.begin() + oldIndex);
			m_SortableLayers.insert(m_SortableLayers.begin() + newIndex, layer);
		}
	}

	void LayerHandler::removeLayer(std::string layerId) {
		int index = getLayerIndex(layerId);
		TileLayer* layer = getLayer(layerId);


		if (index != -1) {
			m_SortableLayers.erase(m_SortableLayers.begin() + index);
			if (m_AllLayers.find(layer) != m_AllLayers.end()) {
				m_AllLayers.erase(layer);
			}
		}

		if (index != -1 && m_SortableLayers.size() > 1) {
			TileLayer* layer = getLayer(layerId);

			bool shouldUpdateActiveLayer = false;

			if (layer == m_ActiveLayer) {
				shouldUpdateActiveLayer = true;
			}

			m_SortableLayers.erase(m_SortableLayers.begin() + index);

			if (shouldUpdateActiveLayer) {
				m_ActiveLayer = m_SortableLayers[0];
			}
		}
	}

	int LayerHandler::getLayerIndex(std::string layerId) {
		int index = -1;

		auto it = find_if(m_SortableLayers.begin(), m_SortableLayers.end(), [&](TileLayer* layer) { return layer->getId() == layerId; });

		if (it != m_SortableLayers.end()) {
			return it - m_SortableLayers.begin();
		}

		return -1;
	}

	void LayerHandler::addBeforeLayer(TileLayer* layer) {
		m_BeforeLayers.push_back(layer);
		m_AllLayers.insert(layer);
	}

	std::vector<TileLayer*>& LayerHandler::getBeforeLayers() {
		return m_BeforeLayers;
	}


	void LayerHandler::addAfterLayer(TileLayer* layer) {
		m_AfterLayers.push_back(layer);
		m_AllLayers.insert(layer);
	}

	std::vector<TileLayer*>& LayerHandler::getAfterLayers() {
		return m_AfterLayers;
	}

	TileLayer* LayerHandler::getActiveLayer() {
		if (m_ActiveLayer == nullptr) {
			throw "No active layer for the current document";
		}

		return m_ActiveLayer;
	}

	void LayerHandler::setActiveLayer(std::string id)
	{
		m_ActiveLayer = getLayer(id);
	}
}}