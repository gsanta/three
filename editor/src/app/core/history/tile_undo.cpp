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
            m_PrevList.push_back(prevRect);
        }

        if (newRect)
        {
            m_NewList.push_back(newRect);
        }
    }

    TileUndo TileUndo::createForActiveTileLayer(Document &document)
    {
        return TileUndo(document);
    }

} // namespace editor
} // namespace spright
