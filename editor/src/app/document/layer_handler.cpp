#include "./layer_handler.h"

namespace spright {
	Layer* findLayer(std::string id, std::vector<Layer*>& layers) {
		auto it = find_if(layers.begin(), layers.end(), [&id](Layer* layer) { return layer->getId() == id; });

		if (it != layers.end()) {
			return *it;
		}

		return nullptr;
	}

	Layer* LayerHandler::getLayer(std::string id)
	{
		Layer* layer = findLayer(id, m_Layers);

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

	void LayerHandler::addSortedLayer(Layer* layer)
	{
		m_Layers.push_back(layer);
	}


	std::vector<Layer*>& LayerHandler::getSortedLayers() {
		return m_Layers;
	}

	void LayerHandler::setLayerIndex(std::string layerId, int newIndex) {
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

	void LayerHandler::removeLayer(std::string layerId) {
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

	int LayerHandler::getLayerIndex(std::string layerId) {
		int index = -1;

		auto it = find_if(m_Layers.begin(), m_Layers.end(), [&](Layer* layer) { return layer->getId() == layerId; });

		if (it != m_Layers.end()) {
			return it - m_Layers.begin();
		}

		return -1;
	}

	void LayerHandler::addBeforeLayer(Layer* layer) {
		m_BeforeLayers.push_back(layer);
	}

	std::vector<Layer*>& LayerHandler::getBeforeLayers() {
		return m_BeforeLayers;
	}

	void LayerHandler::addAfterLayer(Layer* layer) {
		m_AfterLayers.push_back(layer);
	}

	std::vector<Layer*>& LayerHandler::getAfterLayers() {
		return m_AfterLayers;
	}

	Layer* LayerHandler::getActiveLayer() {
		if (m_ActiveLayer == nullptr) {
			throw "No active layer for the current document";
		}

		return m_ActiveLayer;
	}

	void LayerHandler::setActiveLayer(std::string id)
	{
		m_ActiveLayer = getLayer(id);
	}
}