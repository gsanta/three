#include "./erase_undo.h"

namespace spright
{
namespace editor
{
    EraseUndo::EraseUndo(Document &document)
    {
        m_DrawingPos = document.getActiveDrawingIndex();
        m_FramePos = document.getActiveDrawing().getActiveFrameIndex();
        m_TileLayerPos = document.getActiveDrawing().getActiveLayerIndex();
    }

    void EraseUndo::undo(Document &document) const
    {
        TileLayer &tileLayer = document.getDrawing(m_DrawingPos).getFrames()[m_FramePos].getLayers()[m_TileLayerPos];

        for (std::shared_ptr<Rect2D> rect : m_Rects)
        {
            tileLayer.add(*rect);
        }
    }

    void EraseUndo::redo(Document &document) const
    {
        TileLayer &tileLayer = document.getDrawing(m_DrawingPos).getFrames()[m_FramePos].getLayers()[m_TileLayerPos];

        for (std::shared_ptr<Rect2D> rect : m_Rects)
        {
            tileLayer.remove(*rect);
        }
    }

    void EraseUndo::addTile(std::shared_ptr<Rect2D> rect)
    {
        if (rect)
        {
            m_Rects.push_back(rect);
        }
    }

} // namespace editor
} // namespace spright
