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

    void BoxSelector::select(const TileLayer &layer, const Vec2 &curr, const Vec2 &start)
    {
        float tileSize = layer.getTileSize();

        unsigned int color = 0x800099ff;

        BoundsInt tileBounds = calc_selection_bounds(layer, start, curr);

        m_SelectionBuffer->clear();

        for (float i = tileBounds.minX; i <= tileBounds.maxX; i++)
        {
            for (float j = tileBounds.minY; j <= tileBounds.maxY; j++)
            {
                int tileIndex = layer.getTileIndex(i, j);
                m_SelectionBuffer->add(tileIndex, layer);
            }
        }
    }

    void BoxSelector::clear()
    {
    }

    bool BoxSelector::isSelectionChanged(const TileLayer &layer,
                                         const Vec2 &curr,
                                         const Vec2 &prev,
                                         const Vec2 &start) const
    {
        BoundsInt currBounds = calc_selection_bounds(layer, start, curr);
        BoundsInt prevBounds = calc_selection_bounds(layer, start, prev);

        return currBounds != prevBounds;
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
