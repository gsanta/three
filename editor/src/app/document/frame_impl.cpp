#include "frame_impl.h"

namespace spright { namespace editor {

	TileLayer& find_layer(std::string id, std::vector<TileLayer>& layers) {
		auto it = find_if(layers.begin(), layers.end(), [&id](TileLayer& layer) { return layer.getId() == id; });

		if (it != layers.end()) {
			return *it;
		}

		throw std::invalid_argument("Layer with id " + id + " not found");
	}

	FrameImpl::FrameImpl() : m_Index(0) {}

	FrameImpl::FrameImpl(size_t index) : m_Index(index)
	{
	}

	FrameImpl::FrameImpl(const Frame& frame): m_Index(frame.getIndex()), m_Layers(frame.getLayers()) {

	}

	TileLayer& FrameImpl::addLayer(const TileLayer& layer)
	{
		m_Layers.push_back(layer);
		return m_Layers.back();
	}

	void FrameImpl::insertLayer(const TileLayer& layer, size_t index) {
		m_Layers.insert(m_Layers.begin() + index, layer);
	}

	TileLayer& FrameImpl::getLayer(std::string id)
	{
		TileLayer& layer = find_layer(id, m_Layers);

		return layer;
	}

	TileLayer& FrameImpl::getLayerAtIndex(size_t index)
	{
		if (index >= m_Layers.size()) {
			throw std::invalid_argument("No layer at index " + std::to_string(index));
		}
		return *(m_Layers.begin() + index);
	}

	std::vector<TileLayer>& FrameImpl::getLayers() {
		return m_Layers;
	}

	const std::vector<TileLayer>& FrameImpl::getLayers() const
	{
		return m_Layers;
	}

	void FrameImpl::removeLayer(std::string layerId) {
		int index = getLayerIndex(getLayer(layerId));

		if (index != -1) {
			m_Layers.erase(m_Layers.begin() + index);
		}
	}

	size_t FrameImpl::getLayerIndex(const TileLayer& tileLayer) const {
		int index = -1;

		auto it = find_if(m_Layers.begin(), m_Layers.end(), [&](const TileLayer& layer) { return layer.getId() == tileLayer.getId(); });

		if (it != m_Layers.end()) {
			return it - m_Layers.begin();
		}

		return -1;
	}

	size_t FrameImpl::getIndex() const
	{
		return m_Index;
	}

	void FrameImpl::setIndex(size_t index)
	{
		m_Index = index;
	}
}}