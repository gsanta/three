#include "./selection_buffer.h"

namespace spright
{
namespace editor
{
    SelectionBuffer::SelectionBuffer(std::shared_ptr<DocumentStore> documentStore) : m_DocumentStore(documentStore)
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

    const BoundsInt &SelectionBuffer::getSelectionBounds()
    {
        if (m_IsBoundsDirty)
        {
            updateBounds();
            m_IsBoundsDirty = false;
        }

        return m_SelectionTileBounds;
    }

    void SelectionBuffer::updateBounds()
    {
        TileLayer &tempLayer = m_DocumentStore->getActiveDocument().getActiveDrawing().getTempLayer();

        int minX = std::numeric_limits<int>::max();
        int minY = std::numeric_limits<int>::max();
        int maxX = std::numeric_limits<int>::min();
        int maxY = std::numeric_limits<int>::min();

        if (m_TileIndexes.size() == 0)
        {
            m_SelectionTileBounds = BoundsInt();
            return;
        }

        for (int tileIndex : m_TileIndexes)
        {
            Vec2Int tilePos = tempLayer.getTilePos(tileIndex);

            if (tilePos.x < minX)
            {
                minX = tilePos.x;
            }

            if (tilePos.x > maxX)
            {
                maxX = tilePos.x;
            }

            if (tilePos.y < minY)
            {
                minY = tilePos.y;
            }

            if (tilePos.y > maxY)
            {
                maxY = tilePos.y;
            }
        }

        m_SelectionTileBounds = BoundsInt(minX, minY, maxX, maxY);
    }
} // namespace editor
} // namespace spright
