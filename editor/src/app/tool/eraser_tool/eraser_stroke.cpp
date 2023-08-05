#include "./eraser_stroke.h"

namespace spright
{
namespace editor
{
    EraserStroke::EraserStroke()
    {
    }

    EraserStroke::EraserStroke(int eraserSize) : m_Size(eraserSize)
    {
    }

    void editor::EraserStroke::draw(TileLayer &drawLayer, const Vec2 &pos)
    {
        setPosition(drawLayer, pos);
    }

    void EraserStroke::clear(TileLayer &drawLayer)
    {
        m_TopLine = nullptr;
        m_RightLine = nullptr;
        m_BottomLine = nullptr;
        m_LeftLine = nullptr;
        drawLayer.clear();
    }

    float EraserStroke::getStrokeWidth()
    {
        return m_StrokeWidth;
    }

    void EraserStroke::init(TileLayer &drawLayer, float tileSize)
    {
        float eraserArea = tileSize * static_cast<float>(m_Size);

        unsigned int color = 0xff0099ff;

        m_TopLine = &drawLayer.add(Rect2D(-eraserArea / 2.0f, eraserArea / 2.0f, eraserArea, m_StrokeWidth, color));
        m_RightLine = &drawLayer.add(Rect2D(eraserArea / 2.0f, -eraserArea / 2.0f, m_StrokeWidth, eraserArea, color));
        m_BottomLine = &drawLayer.add(Rect2D(-eraserArea / 2.0f, -eraserArea / 2.0f, eraserArea, m_StrokeWidth, color));
        m_LeftLine = &drawLayer.add(Rect2D(-eraserArea / 2.0f, -eraserArea / 2.0f, m_StrokeWidth, eraserArea, color));
    }

    void EraserStroke::setPosition(TileLayer &drawLayer, const Vec2 &pos)
    {
        float halfEraserSize = drawLayer.getTileSize() * static_cast<float>(m_Size) / 2.0f;

        int tileIndex = drawLayer.getTileIndex(pos);
        float halfTileSize = drawLayer.getTileSize() / 2.0f;
        Vec2 tileCenterPos = drawLayer.getWorldPos(tileIndex);

        if (m_Size % 2 == 0)
        {
            tileCenterPos += Vec2(-halfTileSize, -halfTileSize);
        }

        float eraserArea = drawLayer.getTileSize() * static_cast<float>(m_Size);

        unsigned int color = 0xff0099ff;

        if (!m_TopLine)
        {
            m_TopLine = &drawLayer.add(Rect2D(-eraserArea / 2.0f, eraserArea / 2.0f, eraserArea, m_StrokeWidth, color));
        }
        m_TopLine->setCenterPosition(tileCenterPos + Vec2(0, halfEraserSize));
        if (!m_RightLine)
        {
            m_RightLine =
                &drawLayer.add(Rect2D(eraserArea / 2.0f, -eraserArea / 2.0f, m_StrokeWidth, eraserArea, color));
        }
        m_RightLine->setCenterPosition(tileCenterPos + Vec2(halfEraserSize, 0));
        if (!m_BottomLine)
        {
            m_BottomLine =
                &drawLayer.add(Rect2D(-eraserArea / 2.0f, -eraserArea / 2.0f, eraserArea, m_StrokeWidth, color));
        }
        m_BottomLine->setCenterPosition(tileCenterPos + Vec2(0, -halfEraserSize));
        if (!m_LeftLine)
        {
            m_LeftLine =
                &drawLayer.add(Rect2D(-eraserArea / 2.0f, -eraserArea / 2.0f, m_StrokeWidth, eraserArea, color));
        }
        m_LeftLine->setCenterPosition(tileCenterPos + Vec2(-halfEraserSize, 0));
    }
} // namespace editor
} // namespace spright
