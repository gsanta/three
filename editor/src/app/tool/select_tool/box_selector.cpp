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

    void BoxSelector::select(const TileLayer &layer, const Vec2 &curr, const Vec2 &prev, const Vec2 &start)
    {
        float tileSize = layer.getTileSize();

        unsigned int color = 0x800099ff;

        BoundsInt bounds = calcSelectionBounds(layer, start, curr);

        m_SelectionBuffer->clear();

        for (float i = bounds.minX; i < bounds.maxX; i += tileSize)
        {
            for (float j = bounds.minY; j < bounds.maxY; j += tileSize)
            {
                Rect2D rect(i, j, tileSize, tileSize, color);
                int tileIndex = layer.getTileIndex(rect.getCenterPosition2d());
                m_SelectionBuffer->add(tileIndex);
            }
        }
    }

    bool BoxSelector::isSelectionChanged(const TileLayer &layer,
                                         const Vec2 &curr,
                                         const Vec2 &prev,
                                         const Vec2 &start) const
    {
        BoundsInt currBounds = calcSelectionBounds(layer, start, curr);
        BoundsInt prevBounds = calcSelectionBounds(layer, start, prev);

        return prevBounds != currBounds;
    }

    void BoxSelector::clear()
    {
    }

    BoundsInt BoxSelector::calcSelectionBounds(const TileLayer &layer, const Vec2 &vec1, const Vec2 &vec2) const
    {
        Bounds bounds(vec1, vec2);

        Vec2 bottomLeft = bounds.getBottomLeft();
        Vec2 topRight = bounds.getTopRight();

        float tileSize = layer.getTileSize();

        unsigned int color = 0x800099ff;

        float xStart = roundByTileSize(bottomLeft.x, tileSize);
        float xEnd = roundByTileSize(topRight.x, tileSize);

        float yStart = roundByTileSize(bottomLeft.y, tileSize);
        float yEnd = roundByTileSize(topRight.y, tileSize);

        return BoundsInt(xStart, yStart, xEnd, yEnd);
    }

    float BoxSelector::roundByTileSize(float value, float tileSize) const
    {
        float rounded = value > 0 ? (float)ceil(value / tileSize) : (float)floor(value / tileSize);
        return rounded * tileSize;
    }


    void BoxSelector::clearSprites(TileLayer &layer)
    {
        for (int tileIndex : m_SelectionBuffer->getTileIndexes())
        {
            layer.removeAt(tileIndex);
        }
    }
} // namespace editor
} // namespace spright
