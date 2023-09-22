#include "box_selector.h"

namespace spright
{
namespace editor
{
    BoxSelector::BoxSelector(std::shared_ptr<SelectionBuffer> selectionBuffer) : m_SelectionBuffer(selectionBuffer)
    {
    }

    BoxSelector::~BoxSelector()
    {
    }

    void BoxSelector::select(const TileLayer &activeLayer, TileLayer &tempLayer, const Vec2 &curr, const Vec2 &start)
    {
        float tileSize = activeLayer.getTileSize();

        unsigned int color = 0x800099ff;

        BoundsInt tileBounds = calcSelectionBounds(activeLayer, start, curr);

        m_SelectionBuffer->clear();

        for (float i = tileBounds.minX; i <= tileBounds.maxX; i++)
        {
            for (float j = tileBounds.minY; j <= tileBounds.maxY; j++)
            {
                int tileIndex = activeLayer.getTileIndex(i, j);
                m_SelectionBuffer->add(tileIndex, activeLayer);
            }
        }

        fillTempLayer(tempLayer, curr, start);
    }

    void BoxSelector::clear()
    {
    }

    bool BoxSelector::isSelectionChanged(const TileLayer &layer,
                                         const Vec2 &curr,
                                         const Vec2 &prev,
                                         const Vec2 &start) const
    {
        BoundsInt currBounds = calcSelectionBounds(layer, start, curr);
        BoundsInt prevBounds = calcSelectionBounds(layer, start, prev);

        return currBounds != prevBounds;
    }

    void BoxSelector::fillTempLayer(TileLayer &tempLayer, const Vec2 &vec1, const Vec2 &vec2)
    {
        float tileSize = tempLayer.getTileSize();
        unsigned int color = 0x800099ff;

        const BoundsInt &bounds = calcSelectionBounds(tempLayer, vec1, vec2);

        tempLayer.clear();

        Vec2Int bottomLeft = bounds.getBottomLeft();
        Vec2Int topRight = bounds.getTopRight();

        for (int i = bottomLeft.x; i <= topRight.x; i++)
        {
            for (int j = bottomLeft.y; j <= topRight.y; j++)
            {
                Vec2 bottomLeft = tempLayer.getBottomLeftPos(Vec2Int(i, j));
                Rect2D rect(bottomLeft.x, bottomLeft.y, tileSize, tileSize, color);

                tempLayer.add(rect);
            }
        }
    }

    BoundsInt BoxSelector::calcSelectionBounds(const TileLayer &layer, const Vec2 &vec1, const Vec2 &vec2) const
    {
        Bounds bounds(vec1, vec2);

        Vec2 bottomLeft = bounds.getBottomLeft();
        Vec2 topRight = bounds.getTopRight();

        return BoundsInt(layer.getTilePos(vec1), layer.getTilePos(vec2));
        // int minX = std::numeric_limits<int>::max();
        // int minY = std::numeric_limits<int>::max();
        // int maxX = std::numeric_limits<int>::min();
        // int maxY = std::numeric_limits<int>::min();

        // if (m_TileIndexes.size() == 0)
        // {
        //     return BoundsInt()
        // }

        // for (int tileIndex : m_SelectionBuffer->getTileIndexes())
        // {
        //     Vec2Int tilePos = tempLayer.getTilePos(tileIndex);

        //     if (tilePos.x < minX)
        //     {
        //         minX = tilePos.x;
        //     }

        //     if (tilePos.x > maxX)
        //     {
        //         maxX = tilePos.x;
        //     }

        //     if (tilePos.y < minY)
        //     {
        //         minY = tilePos.y;
        //     }

        //     if (tilePos.y > maxY)
        //     {
        //         maxY = tilePos.y;
        //     }
        // }

        // return BoundsInt(minX, minY, maxX, maxY);
    }
} // namespace editor
} // namespace spright
