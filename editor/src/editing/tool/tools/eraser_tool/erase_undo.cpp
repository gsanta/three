#include "./erase_undo.h"

namespace spright
{
namespace editing
{
    EraseUndo::EraseUndo(Document &document)
    {
        TileCanvas &canvas = get_active_tile_canvas(document);
        m_CanvasIndex = document.getCanvasIndex(canvas);
        ;
        m_FramePos = canvas.getActiveFrameIndex();
        m_TileLayerPos = canvas.getActiveLayerIndex();
    }

    void EraseUndo::undo(Document &document) const
    {
        TileCanvas &canvas = get_tile_canvas_at(document, m_CanvasIndex);
        TileLayer &tileLayer = canvas.getFrames()[m_FramePos].getLayers()[m_TileLayerPos];

        for (std::shared_ptr<Rect2D> rect : m_Rects)
        {
            tileLayer.add(*rect);
        }
    }

    void EraseUndo::redo(Document &document) const
    {
        TileCanvas &canvas = get_tile_canvas_at(document, m_CanvasIndex);
        TileLayer &tileLayer = canvas.getFrames()[m_FramePos].getLayers()[m_TileLayerPos];

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

} // namespace editing
} // namespace spright
