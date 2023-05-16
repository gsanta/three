#include "rectangle_tool.h"

namespace spright
{
namespace editor
{

    RectangleTool::RectangleTool() : Tool("rectangle")
    {
    }

    void RectangleTool::pointerDown(const ToolContext &context)
    {
        if (!context.doc.hasActiveDrawing())
        {
            return;
        }

        int color = context.editorState->color;
        m_Rect = &context.doc.activeDrawing->getActiveLayer().add(
            Rect2D(context.pointer.curr.x, context.pointer.curr.y, 0.1f, 0.1f, color));
    }

    void RectangleTool::pointerUp(const ToolContext &context)
    {
        if (!context.doc.hasActiveDrawing())
        {
            return;
        }

        TileLayer &activeLayer = context.doc.activeDrawing->getActiveLayer();
        float tileSize = activeLayer.getTileSize();
        int color = context.editorState->color;

        Vec2Int bottomLeft = activeLayer.getTilePos(m_Rect->getBounds().getBottomLeft());
        Vec2Int topRight = activeLayer.getTilePos(m_Rect->getBounds().getTopRight());

        context.doc.activeDrawing->getActiveLayer().remove(*m_Rect);

        for (int i = bottomLeft.x; i < topRight.x; i++)
        {
            for (int j = bottomLeft.y; j < topRight.y; j++)
            {
                Rect2D &rect = activeLayer.add(Rect2D(0, 0, tileSize, tileSize, color));

                activeLayer.setTilePos(&rect, Vec2Int(i, j));
            }
        }
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

        this->m_Rect->setPosition(maths::Vec2(left, bottom));
        this->m_Rect->setSize(maths::Vec2(right - left, top - bottom));
    }
} // namespace editor
} // namespace spright
