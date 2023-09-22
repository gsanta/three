#include "./selection_buffer.h"

namespace spright
{
namespace editor
{
    SelectionBuffer::SelectionBuffer()
    {
    }

    void SelectionBuffer::add(int tileIndex, const TileLayer &layer)
    {
        m_TileIndexes.push_back(tileIndex);
        m_IsBoundsDirty = true;
    }

    void SelectionBuffer::clear()
    {
        m_TileIndexes.clear();
        int minX = std::numeric_limits<int>::max();
        int minY = std::numeric_limits<int>::max();
        int maxX = std::numeric_limits<int>::min();
        int maxY = std::numeric_limits<int>::min();

        m_SelectionTileBounds = BoundsInt();
    }

    const std::vector<int> &SelectionBuffer::getTileIndexes()
    {
        return m_TileIndexes;
    }

    void SelectionBuffer::setTileIndexes(std::vector<int> indexes)
    {
        m_TileIndexes = indexes;
    }

    bool SelectionBuffer::containsIndex(int index)
    {
        if (std::find(m_TileIndexes.begin(), m_TileIndexes.end(), index) != m_TileIndexes.end())
        {
            return true;
        }
        return false;
    }
} // namespace editor
} // namespace spright
