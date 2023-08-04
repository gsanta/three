#include "temp_rect_drawer.h"

namespace spright
{
namespace editor
{
    void TempRectDrawer::reset()
    {
        m_Filled = nullptr;
        m_OutlinedTop = nullptr;
        m_OutlinedRight = nullptr;
        m_OutlinedBottom = nullptr;
        m_OutlinedLeft = nullptr;
    }

    const Bounds &TempRectDrawer::getBounds() const
    {
        return m_Bounds;
    }

    void TempRectDrawer::drawFilled(TileLayer &tileLayer, Vec2 from, Vec2 to, int color)
    {
        if (m_Filled == nullptr)
        {
            m_Filled = &tileLayer.add(Rect2D(0, 0, 0.1f, 0.1f, color));
        }

        maths::Vec2 downTilePos = tileLayer.getCenterPos(from);
        maths::Vec2 currTilePos = tileLayer.getCenterPos(to);

        float left = downTilePos.x < currTilePos.x ? downTilePos.x : currTilePos.x;
        float right = downTilePos.x > currTilePos.x ? downTilePos.x : currTilePos.x;
        float bottom = downTilePos.y < currTilePos.y ? downTilePos.y : currTilePos.y;
        float top = downTilePos.y > currTilePos.y ? downTilePos.y : currTilePos.y;

        float halfTileSize = tileLayer.getTileSize() / 2.0f;
        m_Filled->setPosition(maths::Vec2(left - halfTileSize, bottom - halfTileSize));
        m_Filled->setSize(maths::Vec2(right - left, top - bottom));

        m_Bounds = m_Filled->getBounds();
    }

    void TempRectDrawer::drawOutlined(TileLayer &tileLayer, Vec2 from, Vec2 to, int color)
    {
        float tileSize = tileLayer.getTileSize();

        Vec2 downTilePos = tileLayer.getCenterPos(from) - tileSize / 2;
        Vec2 currTilePos = tileLayer.getCenterPos(to) - tileSize / 2;

        Bounds bounds = Bounds::createWithPositions(downTilePos.x, downTilePos.y, currTilePos.x, currTilePos.y);

        if (m_OutlinedTop == nullptr)
        {
            m_OutlinedTop = &tileLayer.add(Rect2D(0, 0, 0.1f, 0.1f, color));
            m_OutlinedRight = &tileLayer.add(Rect2D(1, 0, 0.1f, 0.1f, color));
            m_OutlinedBottom = &tileLayer.add(Rect2D(2, 0, 0.1f, 0.1f, color));
            m_OutlinedLeft = &tileLayer.add(Rect2D(3, 0, 0.1f, 0.1f, color));
        }

        m_OutlinedTop->setSize(Vec2(bounds.getWidth(), tileSize));
        m_OutlinedTop->setPosition(Vec2(bounds.getBottomLeft().x, bounds.getTopRight().y - tileSize));

        m_OutlinedRight->setSize(Vec2(tileSize, bounds.getHeight() - 2 * tileSize));
        m_OutlinedRight->setPosition(Vec2(bounds.getTopRight().x - tileSize, bounds.getBottomLeft().y + tileSize));

        m_OutlinedBottom->setSize(Vec2(bounds.getWidth(), tileSize));
        m_OutlinedBottom->setPosition(Vec2(bounds.getBottomLeft().x, bounds.getBottomLeft().y));

        m_OutlinedLeft->setSize(Vec2(tileSize, bounds.getHeight() - 2 * tileSize));
        m_OutlinedLeft->setPosition(Vec2(bounds.getBottomLeft().x, bounds.getBottomLeft().y + tileSize));

        m_Bounds = bounds;
    }
} // namespace editor
} // namespace spright
