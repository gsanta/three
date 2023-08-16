#include "rectangle_cursor.h"

namespace spright
{
namespace editor
{
    RectangleCursor::RectangleCursor(int eraserSize, bool shouldDisableOnDrag)
        : m_RectangleStroke(eraserSize), Cursor(shouldDisableOnDrag)
    {
    }

    void RectangleCursor::update(TileLayer &foregroundLayer, const PointerInfo &pointerInfo)
    {
        m_RectangleStroke.draw(foregroundLayer, pointerInfo.curr);
    }

    void RectangleCursor::destroy(TileLayer &foregroundLayer)
    {
        m_RectangleStroke.clear(foregroundLayer);
    }

    RectangleStroke &RectangleCursor::getRectangleStroke()
    {
        return m_RectangleStroke;
    }
} // namespace editor
} // namespace spright
