#include "selection_box.h"

namespace spright
{
namespace editor
{
    SelectionBox::SelectionBox()
    {
    }

    SelectionBox::~SelectionBox()
    {
    }

    void SelectionBox::setTileLayer(TileLayer &tileLayer)
    {
        m_Layer = &tileLayer;
    }


    void SelectionBox::start(Vec2 pos)
    {
        clear();
        m_Start = pos;
        m_Bounds.minX = pos.x;
        m_Bounds.maxX = pos.x;
        m_Bounds.minY = pos.y;
        m_Bounds.maxY = pos.y;
    }

    void SelectionBox::setPosition(Vec2 pos)
    {

        calcSelectionBounds(m_Start, pos);

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
    }

    Vec2 SelectionBox::move(Vec2 delta)
    {
        float tileSize = m_Layer->getTileSize();

        m_AbsoluteDelta += delta;

        float xDelta = static_cast<int>(m_AbsoluteDelta.x / tileSize) * tileSize;
        float yDelta = static_cast<int>(m_AbsoluteDelta.y / tileSize) * tileSize;

        Vec2 tileDelta(xDelta - m_PrevTranslate.x, yDelta - m_PrevTranslate.y);

        for (Rect2D *sprite : m_Layer->getRenderables())
        {
            sprite->translate(tileDelta);
        }

        m_PrevTranslate.x = xDelta;
        m_PrevTranslate.y = yDelta;

        return tileDelta;
    }

    void SelectionBox::clear()
    {
        clearSprites();
        m_Start = Vec2();

        m_Bounds = Bounds(0, 0, 0, 0);
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
} // namespace editor
} // namespace spright
