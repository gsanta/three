#include "rectangle_cursor.h"

namespace spright
{
namespace editing
{
    RectangleCursor::RectangleCursor(int size, bool shouldDisableOnDrag) : m_Size(size), Cursor(shouldDisableOnDrag)
    {
    }

    void RectangleCursor::update(ToolContext &context)
    {
        setPosition(context);
    }

    void RectangleCursor::destroy(ToolContext &context)
    {
        m_Rect = nullptr;
        context.doc.activeDrawing->getCursorLayer().clear();
    }

    void RectangleCursor::setPosition(ToolContext &context)
    {
        TileLayer &cursorLayer = context.doc.activeDrawing->getCursorLayer();


        float tileSize = cursorLayer.getTileSize();

        unsigned int color = 0x800099ff;

        int tileIndex = cursorLayer.getTileIndex(context.pointer.curr);

        if (tileIndex == -1)
        {
            destroy(context);
            return;
        }

        float halfTileSize = cursorLayer.getTileSize() / 2.0f;
        Vec2 centerPos = cursorLayer.getCenterPos(tileIndex);

        if (m_Size % 2 == 0)
        {
            centerPos -= halfTileSize;
        }

        float rectSize = cursorLayer.getTileSize() * static_cast<float>(m_Size);

        if (!m_Rect)
        {
            destroy(context);
            m_Rect = &cursorLayer.add(Rect2D(Rect2D(0, 0, rectSize, rectSize, color)));
        }
        m_Rect->setCenterPosition(centerPos);
    }

    void RectangleCursor::setSize(int size)
    {
        m_Size = size;
        m_Rect = nullptr;
    }
} // namespace editing
} // namespace spright
