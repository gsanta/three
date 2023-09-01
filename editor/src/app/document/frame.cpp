#include "frame.h"

namespace spright
{
namespace editor
{
    Frame::Frame() : m_Index(0)
    {
    }

    Frame::Frame(size_t index) : m_Index(index)
    {
    }

    Frame::Frame(const Frame &frame) : m_Index(frame.getIndex()), m_Layers(frame.getLayers())
    {
    }

    bool Frame::isEqual(const Frame &rhs) const
    {
        const Frame &frame = dynamic_cast<const Frame &>(rhs);

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

    TileLayer &Frame::addLayer(const TileLayer &layer)
    {
        size_t index = m_Layers.size();
        m_Layers.push_back(layer);
        TileLayer &newLayer = m_Layers.back();
        newLayer.setIndex(index);

        return m_Layers.back();
    }

    void Frame::insertLayer(const TileLayer &layer, size_t index)
    {
        m_Layers.insert(m_Layers.begin() + index, layer);

        resetLayerIndexes();
    }

    TileLayer &Frame::getLayer(size_t index)
    {
        if (index >= m_Layers.size())
        {
            throw std::invalid_argument("No layer at index " + std::to_string(index));
        }
        return *(m_Layers.begin() + index);
    }

    std::vector<TileLayer> &Frame::getLayers()
    {
        return m_Layers;
    }

    const std::vector<TileLayer> &Frame::getLayers() const
    {
        return m_Layers;
    }

    void Frame::removeLayer(size_t layerIndex)
    {
        if (layerIndex > m_Layers.size())
        {
            throw std::invalid_argument("No layer at index " + layerIndex);
        }
        m_Layers.erase(m_Layers.begin() + layerIndex);
        resetLayerIndexes();
    }

    void Frame::changeLayerOrder(size_t oldOrder, size_t newOrder)
    {
        if (oldOrder >= m_Layers.size() || newOrder >= m_Layers.size())
        {
            throw std::invalid_argument("Layer order is out of bounds");
        }

        TileLayer tileLayer = getLayer(oldOrder);

        m_Layers.erase(m_Layers.begin() + oldOrder);

        insertLayer(tileLayer, newOrder);
    }

    size_t Frame::getIndex() const
    {
        return m_Index;
    }

    void Frame::setIndex(size_t index)
    {
        m_Index = index;
    }

    void Frame::resetLayerIndexes()
    {
        for (int i = 0; i < m_Layers.size(); i++)
        {
            m_Layers[i].setIndex(i);
        }
    }

    nlohmann::json Frame::getJson() const
    {
        nlohmann::json json = {
            {"index", m_Index},
        };

        return json;
    }


    bool operator==(const Frame &lhs, const Frame &rhs)
    {
        return lhs.isEqual(rhs);
    }

    bool operator!=(const Frame &lhs, const Frame &rhs)
    {
        return !lhs.isEqual(rhs);
    }
} // namespace editor
} // namespace spright
