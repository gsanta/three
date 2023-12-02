#include "./selection_buffer.h"

namespace spright
{
namespace editing
{
    SelectionBuffer::SelectionBuffer()
    {
    }

    void SelectionBuffer::add(int tileIndex, const TileLayer &layer)
    {
        m_TileIndexes.push_back(tileIndex);

        updateBounds(layer.getTilePos(tileIndex));
    }

    void SelectionBuffer::clear()
    {
        m_TileIndexes.clear();
        m_TileBounds = BoundsInt();
    }

    const std::vector<int> &SelectionBuffer::getTileIndexes() const
    {
        return m_TileIndexes;
    }

    void SelectionBuffer::setTileIndexes(const std::vector<int> &indexes, const TileLayer &layer)
    {
        m_TileIndexes.clear();

        m_TileBounds = BoundsInt();

        for (int index : indexes)
        {
            m_TileIndexes.push_back(index);
            updateBounds(layer.getTilePos(index));
        }
    }

    bool SelectionBuffer::containsIndex(int index)
    {
        if (std::find(m_TileIndexes.begin(), m_TileIndexes.end(), index) != m_TileIndexes.end())
        {
            return true;
        }
        return false;
    }

    const BoundsInt &SelectionBuffer::getTileBounds() const
    {
        return m_TileBounds;
    }

    void SelectionBuffer::recalcTileIndexesAndBounds(TileLayer &layer, TileLayer &toolLayer)
    {
        std::vector<int> newTileIndexes;

        for (int tileIndex : m_TileIndexes)
        {
            Rect2D *tile = layer.getAtTileIndex(tileIndex);
            if (tile != nullptr)
            {
                layer.updateTileIndex(tile);
            }
        }

        for (Rect2D *tile : toolLayer.getTiles())
        {
            newTileIndexes.push_back(toolLayer.updateTileIndex(tile));
        }

        setTileIndexes(newTileIndexes, layer);
    }

    void SelectionBuffer::updateBounds(const Vec2Int &vec2)
    {

        if (m_TileIndexes.size() == 1)
        {
            m_TileBounds = BoundsInt(vec2, vec2 + 1);
        }
        else
        {
            m_TileBounds.expand(vec2);
        }
    }
} // namespace editing
} // namespace spright
