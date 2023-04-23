#include "rectangle_tool.h"

namespace spright
{
namespace editor
{

    RectangleTool::RectangleTool(Services *services) : m_Services(services), Tool("rectangle")
    {
    }

    void RectangleTool::pointerDown(const ToolContext &context)
    {
        if (!context.doc.hasActiveDrawing())
        {
            return;
        }

        int color = m_Services->getColorPalette()->color;
        m_Rect = &context.doc.activeDrawing->getActiveLayer().add(
            Rect2D(context.pointer.curr.x, context.pointer.curr.y, 0.1f, 0.1f, color));
    }

    void RectangleTool::pointerUp(const ToolContext &context)
    {
        if (!context.pointer.isDown || !context.doc.hasActiveDrawing())
        {
            return;
        }
        int color = m_Services->getColorPalette()->color;
        m_Rect = &context.doc.activeDrawing->getActiveLayer().add(
            Rect2D(context.pointer.curr.x, context.pointer.curr.y - m_Size, m_Size, m_Size, color));
    }

    void RectangleTool::pointerMove(const ToolContext &context)
    {
        if (!context.pointer.isDown || !context.doc.hasActiveDrawing())
        {
            return;
        }

        TileLayer &tileLayer = context.doc.activeDrawing->getActiveLayer();
        maths::Vec2 downTilePos = tileLayer.getBottomLeftPos(context.pointer.down);
        maths::Vec2 currTilePos = tileLayer.getBottomLeftPos(context.pointer.curr);

        float left = downTilePos.x < currTilePos.x ? downTilePos.x : currTilePos.x;
        float right = downTilePos.x > currTilePos.x ? downTilePos.x : currTilePos.x;
        float bottom = downTilePos.y < currTilePos.y ? downTilePos.y : currTilePos.y;
        float top = downTilePos.y > currTilePos.y ? downTilePos.y : currTilePos.y;

        float width = context.pointer.curr.x - context.pointer.down.x;
        float height = context.pointer.curr.y - context.pointer.down.y;
        std::cout << width << std::endl;
        this->m_Rect->setPosition(maths::Vec2(left, bottom));
        this->m_Rect->setSize(maths::Vec2(right - left, top - bottom));
    }
} // namespace editor
} // namespace spright
