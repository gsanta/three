#include "eraser_cursor.h"

namespace spright
{
namespace editor
{
    EraserCursor::EraserCursor(int eraserSize) : m_EraserStroke(eraserSize)
    {
    }

    void EraserCursor::update(TileLayer &foregroundLayer, const PointerInfo &pointerInfo)
    {
        m_EraserStroke.draw(foregroundLayer, pointerInfo.curr);
    }

    void EraserCursor::destroy(TileLayer &foregroundLayer)
    {
        m_EraserStroke.clear(foregroundLayer);
    }
} // namespace editor
} // namespace spright