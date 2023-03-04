#include "frame.h"


namespace spright { namespace editor {

	TileLayer& find_layer(std::string id, std::vector<TileLayer>& layers) {
		auto it = find_if(layers.begin(), layers.end(), [&id](TileLayer& layer) { return layer.getId() == id; });

		if (it != layers.end()) {
			return *it;
		}

		throw std::invalid_argument("Layer with id " + id + " not found");
	}

	// TODO: use copy/move constructor, tile layer is not deleted!
	void Frame::addLayer(const TileLayer& layer)
	{
		m_Layers.push_back(layer);
	}

	TileLayer& Frame::getLayer(std::string id)
	{
		TileLayer& layer = find_layer(id, m_Layers);

		return layer;
	}

	std::vector<TileLayer>& Frame::getLayers() {
		return m_Layers;
	}

	void Frame::setLayerIndex(std::string layerId, int newIndex) {
		int oldIndex = getLayerIndex(layerId);

		if (oldIndex < newIndex) {
			newIndex -= 1;
		}

		TileLayer& layer = getLayer(layerId);

		m_Layers.erase(m_Layers.begin() + oldIndex);
		m_Layers.insert(m_Layers.begin() + newIndex, layer);
	}

	void Frame::removeLayer(std::string layerId) {
		int index = getLayerIndex(layerId);

		if (index != -1) {
			m_Layers.erase(m_Layers.begin() + index);
		}
	}

	int Frame::getLayerIndex(std::string layerId) {
		int index = -1;

		auto it = find_if(m_Layers.begin(), m_Layers.end(), [&](TileLayer& layer) { return layer.getId() == layerId; });

		if (it != m_Layers.end()) {
			return it - m_Layers.begin();
		}

		return -1;
	}
}}