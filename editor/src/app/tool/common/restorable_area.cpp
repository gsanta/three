#include "./restorable_area.h"

namespace spright
{
namespace editor
{

    void RestorableArea::saveArea(const TileLayer &activeLayer,
                                  const std::vector<int> &originalSelectedIndexes,
                                  const BoundsInt &area)
    {
        m_SavedArea = area;
        m_OriginalSelectedIndexes = originalSelectedIndexes;
        m_ImpactedIndexes.clear();
        m_TileView.reset(new TileView(activeLayer.getBounds(), activeLayer.getTileSize()));

        tile_operation_copy_area(activeLayer, *m_TileView, area, area.getBottomLeft());

        for (Rect2D *tile : m_TileView->getTiles())
        {
            m_ImpactedIndexes.push_back(m_TileView->getTileIndex(*tile));
        }
    }

    void RestorableArea::restoreArea(TileLayer &activeLayer, const SelectionBuffer &selectionBuffer)
    {
        const std::vector<int> &oldIndexes = selectionBuffer.getTileIndexes();

        for (int index : oldIndexes)
        {
            activeLayer.removeAt(index);
        }

        tile_operation_copy_all(*m_TileView, activeLayer);
    }

    void RestorableArea::clear()
    {
        m_TileView.release();
        m_SavedArea = BoundsInt();
        m_ImpactedIndexes.clear();
        m_OriginalSelectedIndexes.clear();
    }


    const std::vector<int> &RestorableArea::getOriginalSelectedIndexes() const
    {
        return m_OriginalSelectedIndexes;
    }

    const BoundsInt &RestorableArea::getSavedArea()
    {
        return m_SavedArea;
    }

    const TileView &RestorableArea::getTileView()
    {
        return *m_TileView;
    }
} // namespace editor
} // namespace spright
