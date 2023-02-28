#include "frame.h"


namespace spright { namespace editor {

	TileLayer* find_layer(std::string id, std::vector<TileLayer*>& layers) {
		auto it = find_if(layers.begin(), layers.end(), [&id](TileLayer* layer) { return layer->getId() == id; });

		if (it != layers.end()) {
			return *it;
		}

		return nullptr;
	}

	// TODO: use copy/move constructor, tile layer is not deleted!
	void Frame::addLayer(TileLayer* layer)
	{
		m_Layers.push_back(layer);
	}

	TileLayer* Frame::getLayer(std::string id)
	{
		TileLayer* layer = find_layer(id, m_Layers);

		if (layer != nullptr) {
			return layer;
		}
	}

	std::vector<TileLayer*>& Frame::getLayers() {
		return m_Layers;
	}

	void Frame::setLayerIndex(std::string layerId, int newIndex) {
		int oldIndex = getLayerIndex(layerId);

		if (oldIndex < newIndex) {
			newIndex -= 1;
		}

		TileLayer* layer = getLayer(layerId);

		if (layer != nullptr) {
			m_Layers.erase(m_Layers.begin() + oldIndex);
			m_Layers.insert(m_Layers.begin() + newIndex, layer);
		}
	}

	void Frame::removeLayer(std::string layerId) {
		int index = getLayerIndex(layerId);
		TileLayer* layer = getLayer(layerId);


		if (index != -1) {
			m_Layers.erase(m_Layers.begin() + index);
		}
	}

	int Frame::getLayerIndex(std::string layerId) {
		int index = -1;

		auto it = find_if(m_Layers.begin(), m_Layers.end(), [&](TileLayer* layer) { return layer->getId() == layerId; });

		if (it != m_Layers.end()) {
			return it - m_Layers.begin();
		}

		return -1;
	}
}}