#include "./tile_undo.h"

namespace spright
{
namespace editor
{
    TileUndo::TileUndo(Document &document)
    {
        m_DrawingPos = document.getActiveDrawingIndex();
        m_FramePos = document.getActiveDrawing().getActiveFrameIndex();
        m_TileLayerPos = document.getActiveDrawing().getActiveLayerIndex();
    }

    void TileUndo::undo(Document &document) const
    {
        TileLayer &tileLayer = document.getDrawings()[m_DrawingPos].getFrames()[m_FramePos].getLayers()[m_TileLayerPos];

        for (std::shared_ptr<Rect2D> rect : m_NewList)
        {
            tileLayer.remove(*rect);
        }

        for (std::shared_ptr<Rect2D> rect : m_PrevList)
        {
            tileLayer.add(*rect);
        }
    }

    void TileUndo::redo(Document &document) const
    {
        TileLayer &tileLayer = document.getDrawings()[m_DrawingPos].getFrames()[m_FramePos].getLayers()[m_TileLayerPos];

        for (std::shared_ptr<Rect2D> rect : m_NewList)
        {
            tileLayer.add(*rect);
        }
    }

    void TileUndo::addTile(std::shared_ptr<Rect2D> prevRect, std::shared_ptr<Rect2D> newRect)
    {
        if (prevRect)
        {
            auto it = m_NewList.find(prevRect);
            if (it == m_NewList.end())
            {
                m_PrevList.insert(prevRect);
            }
        }

        if (newRect)
        {
            m_NewList.insert(newRect);
        }
    }

    TileUndo TileUndo::createForActiveTileLayer(Document &document)
    {
        return TileUndo(document);
    }

} // namespace editor
} // namespace spright
