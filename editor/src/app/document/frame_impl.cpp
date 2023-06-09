#include "frame_impl.h"

namespace spright
{
namespace editor
{
    FrameImpl::FrameImpl() : m_Index(0)
    {
    }

    FrameImpl::FrameImpl(size_t index) : m_Index(index)
    {
    }

    FrameImpl::FrameImpl(const Frame &frame) : m_Index(frame.getIndex()), m_Layers(frame.getLayers())
    {
    }

    bool FrameImpl::isEqual(const Frame &rhs) const
    {
        const FrameImpl &frame = dynamic_cast<const FrameImpl &>(rhs);

        if (m_Layers.size() != frame.m_Layers.size())
        {
            return false;
        }

        for (int i = 0; i < m_Layers.size(); i++)
        {
            if (frame.m_Layers[i] != m_Layers[i])
            {
                return false;
            }
        }

        return true;
    }

    TileLayer &FrameImpl::addLayer(const TileLayer &layer)
    {
        size_t index = m_Layers.size();
        m_Layers.push_back(layer);
        TileLayer &newLayer = m_Layers.back();
        newLayer.setIndex(index);

        return m_Layers.back();
    }

    void FrameImpl::insertLayer(const TileLayer &layer, size_t index)
    {
        m_Layers.insert(m_Layers.begin() + index, layer);

        resetLayerIndexes();
    }

    TileLayer &FrameImpl::getLayer(size_t index)
    {
        if (index >= m_Layers.size())
        {
            throw std::invalid_argument("No layer at index " + std::to_string(index));
        }
        return *(m_Layers.begin() + index);
    }

    std::vector<TileLayer> &FrameImpl::getLayers()
    {
        return m_Layers;
    }

    const std::vector<TileLayer> &FrameImpl::getLayers() const
    {
        return m_Layers;
    }

    void FrameImpl::removeLayer(size_t layerIndex)
    {
        if (layerIndex > m_Layers.size())
        {
            throw std::invalid_argument("No layer at index " + layerIndex);
        }
        m_Layers.erase(m_Layers.begin() + layerIndex);
        resetLayerIndexes();
    }

    void FrameImpl::changeLayerOrder(size_t oldOrder, size_t newOrder)
    {
        if (oldOrder >= m_Layers.size() || newOrder >= m_Layers.size())
        {
            throw std::invalid_argument("Layer order is out of bounds");
        }

        TileLayer &tileLayer1 = getLayer(1);
        TileLayer tileLayer = getLayer(oldOrder);

        m_Layers.erase(m_Layers.begin() + oldOrder);

        insertLayer(tileLayer, newOrder);
    }

    size_t FrameImpl::getIndex() const
    {
        return m_Index;
    }

    void FrameImpl::setIndex(size_t index)
    {
        m_Index = index;
    }

    void FrameImpl::resetLayerIndexes()
    {
        for (int i = 0; i < m_Layers.size(); i++)
        {
            m_Layers[i].setIndex(i);
        }
    }

    nlohmann::json FrameImpl::getJson() const
    {
        nlohmann::json json = {
            {"index", m_Index},
        };

        return json;
    }
} // namespace editor
} // namespace spright
