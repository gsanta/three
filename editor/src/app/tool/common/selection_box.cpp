#include "selection_box.h"

namespace spright
{
namespace editor
{
    SelectionBox::SelectionBox(TileLayer *tileLayer) : m_Layer(tileLayer)
    {
    }

    SelectionBox::~SelectionBox()
    {
    }

    void SelectionBox::setSelectionStart(Vec2 pos)
    {
        clear();
        m_SelectioinStart = pos;
        m_Bounds.minX = pos.x;
        m_Bounds.maxX = pos.x;
        m_Bounds.minY = pos.y;
        m_Bounds.maxY = pos.y;
    }

    void SelectionBox::setSelectionEnd(Vec2 pos)
    {
        calcSelectionBounds(m_SelectioinStart, pos);

        Vec2 bottomLeft = m_Bounds.getBottomLeft();
        Vec2 topRight = m_Bounds.getTopRight();

        float tileSize = m_Layer->getTileSize();

        m_Layer->clear();
        clearSprites();

        unsigned int color = 0xff0099ff;

        float xStart = static_cast<int>(bottomLeft.x / tileSize) * tileSize;
        float xEnd = static_cast<int>(topRight.x / tileSize) * tileSize;
        float width = xEnd - xStart;
        float yStart = static_cast<int>(bottomLeft.y / tileSize) * tileSize;
        float yEnd = static_cast<int>(topRight.y / tileSize) * tileSize;
        float height = yEnd - yStart;

        Rect2D *bottom = new Rect2D(xStart, yStart, width, 0.1f, color);
        Rect2D *top = new Rect2D(xStart, yEnd, width, 0.1f, color);
        Rect2D *left = new Rect2D(xStart, yStart, 0.1f, height, color);
        Rect2D *right = new Rect2D(xEnd, yStart, 0.1f, height, color);

        m_Layer->add(Rect2D(xStart, yStart, width, 0.1f, color));
        m_Layer->add(Rect2D(xStart, yEnd, width, 0.1f, color));
        m_Layer->add(Rect2D(xStart, yStart, 0.1f, height, color));
        m_Layer->add(Rect2D(xEnd, yStart, 0.1f, height, color));

        calcSelectionBounds(Vec2(xStart, yStart), Vec2(xEnd, yEnd));
    }

    void SelectionBox::setMoveStart(Vec2 pos)
    {
        m_IsMoveStarted = true;
        m_MoveStart = pos;
        m_MovePrev = pos;
    }

    Vec2 SelectionBox::setMoveEnd(Vec2 pos)
    {
        if (!m_IsMoveStarted)
        {
            throw "Call setMoveStart before calling setMoveEnd";
        }

        Vec2 delta = pos - m_MoveStart;
        Vec2 deltaPrev = m_MovePrev - m_MoveStart;

        float tileSize = m_Layer->getTileSize();

        float tiledDeltaPrevX = static_cast<int>(deltaPrev.x / tileSize) * tileSize;
        float tiledDeltaPrevY = static_cast<int>(deltaPrev.y / tileSize) * tileSize;
        Vec2 tileDeltaPrev = Vec2(tiledDeltaPrevX, tiledDeltaPrevY);

        float tiledDeltaX = static_cast<int>(delta.x / tileSize) * tileSize;
        float tiledDeltaY = static_cast<int>(delta.y / tileSize) * tileSize;
        Vec2 tileDelta = Vec2(tiledDeltaX, tiledDeltaY);

        for (Rect2D *sprite : m_Layer->getTiles())
        {
            sprite->translate(-tileDeltaPrev);
            sprite->translate(tileDelta);
        }

        m_MovePrev = pos;

        Vec2 diff = tileDelta - tileDeltaPrev;

        m_Bounds.translate(diff.x, diff.y);

        return diff;
    }

    void SelectionBox::clear()
    {
        if (m_Layer != nullptr)
        {
            clearSprites();
        }
        m_SelectioinStart = Vec2();
        m_Bounds = Bounds(0, 0, 0, 0);
        m_IsMoveStarted = false;
    }

    void SelectionBox::reset(TileLayer *layer)
    {
        clear();
        m_Layer = layer;
    }

    bool SelectionBox::isInsideSelection(Vec2 point)
    {
        return m_Bounds.contains(point.x, point.y);
    }

    Bounds SelectionBox::getBounds()
    {
        return m_Bounds;
    }

    void SelectionBox::calcSelectionBounds(Vec2 vec1, Vec2 vec2)
    {
        float startX = vec1.x < vec2.x ? vec1.x : vec2.x;
        float endX = vec1.x < vec2.x ? vec2.x : vec1.x;
        float startY = vec1.y < vec2.y ? vec1.y : vec2.y;
        float endY = vec1.y < vec2.y ? vec2.y : vec1.y;

        m_Bounds.minX = startX;
        m_Bounds.maxX = endX;
        m_Bounds.minY = startY;
        m_Bounds.maxY = endY;
    }

    void SelectionBox::clearSprites()
    {
        m_Layer->clear();
    }

    TileLayer *SelectionBox::getTileLayer()
    {
        return m_Layer;
    }

} // namespace editor
} // namespace spright
