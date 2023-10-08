#include "./restorable_area.h"

namespace spright
{
namespace editor
{

    void RestorableArea::saveArea(const TileLayer &activeLayer,
                                  const std::vector<int> &originalSelectedIndexes,
                                  const BoundsInt &area)
    {
        m_OriginalSelectedIndexes = originalSelectedIndexes;
        m_ImpactedIndexes.clear();
        m_ImpactedTiles.reset(new TileView(activeLayer.getBounds(), activeLayer.getTileSize()));

        tile_operation_copy_area(activeLayer, *m_ImpactedTiles, area, area.getBottomLeft());

        for (Rect2D *tile : m_ImpactedTiles->getTiles())
        {
            m_ImpactedIndexes.push_back(m_ImpactedTiles->getTileIndex(*tile));
        }
    }

    void RestorableArea::restoreArea(TileLayer &activeLayer, const SelectionBuffer &selectionBuffer)
    {
        const std::vector<int> &oldIndexes = selectionBuffer.getTileIndexes();

        for (int index : oldIndexes)
        {
            activeLayer.removeAt(index);
        }

        tile_operation_copy_all(*m_ImpactedTiles, activeLayer);
    }

    const std::vector<int> &RestorableArea::getOriginalSelectedIndexes() const
    {
        return m_OriginalSelectedIndexes;
    }
} // namespace editor
} // namespace spright
