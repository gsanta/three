#include "frame.h"


namespace spright { namespace editor {

	TileLayer& find_layer(std::string id, std::vector<TileLayer>& layers) {
		auto it = find_if(layers.begin(), layers.end(), [&id](TileLayer& layer) { return layer.getId() == id; });

		if (it != layers.end()) {
			return *it;
		}

		throw std::invalid_argument("Layer with id " + id + " not found");
	}

	void Frame::addLayer(const TileLayer& layer)
	{
		m_Layers.push_back(layer);
	}

	void Frame::insertLayer(const TileLayer& layer, size_t index) {
		m_Layers.insert(m_Layers.begin() + index, layer);
	}

	TileLayer& Frame::getLayer(std::string id)
	{
		TileLayer& layer = find_layer(id, m_Layers);

		return layer;
	}

	std::vector<TileLayer>& Frame::getLayers() {
		return m_Layers;
	}

	void Frame::removeLayer(std::string layerId) {
		int index = getLayerIndex(getLayer(layerId));

		if (index != -1) {
			m_Layers.erase(m_Layers.begin() + index);
		}
	}

	int Frame::getLayerIndex(const TileLayer& tileLayer) const {
		int index = -1;

		auto it = find_if(m_Layers.begin(), m_Layers.end(), [&](const TileLayer& layer) { return layer.getId() == tileLayer.getId(); });

		if (it != m_Layers.end()) {
			return it - m_Layers.begin();
		}

		return -1;
	}
}}