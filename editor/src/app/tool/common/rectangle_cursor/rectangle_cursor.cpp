#include "rectangle_cursor.h"

namespace spright
{
namespace editor
{
    RectangleCursor::RectangleCursor(int size, bool shouldDisableOnDrag) : m_Size(size), Cursor(shouldDisableOnDrag)
    {
    }

    void RectangleCursor::update(TileLayer &tempLayer, const PointerInfo &pointerInfo)
    {
        setPosition(tempLayer, pointerInfo.curr);
    }

    void RectangleCursor::destroy(TileLayer &tempLayer)
    {
        m_Rect = nullptr;
        tempLayer.clear();
    }

    void RectangleCursor::setPosition(TileLayer &drawLayer, const Vec2 &pos)
    {
        float tileSize = drawLayer.getTileSize();

        unsigned int color = 0x800099ff;

        int tileIndex = drawLayer.getTileIndex(pos);
        float halfTileSize = drawLayer.getTileSize() / 2.0f;
        Vec2 centerPos = drawLayer.getCenterPos(tileIndex);

        if (m_Size % 2 == 0)
        {
            centerPos -= halfTileSize;
        }

        float rectSize = drawLayer.getTileSize() * static_cast<float>(m_Size);

        if (!m_Rect)
        {
            m_Rect = &drawLayer.add(Rect2D(Rect2D(0, 0, rectSize, rectSize, color)));
        }
        m_Rect->setCenterPosition(centerPos);
    }
} // namespace editor
} // namespace spright
