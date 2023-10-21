#include "rectangle_tool.h"

#include "../color_picker_tool/color_picker_tool.h"

namespace spright
{
namespace editor
{

    RectangleTool::RectangleTool() : Tool("rectangle", std::make_shared<RectangleCursor>(1))
    {
    }

    void RectangleTool::pointerDown(const ToolContext &context)
    {
        if (!context.doc.hasActiveDrawing())
        {
            return;
        }
    }

    void RectangleTool::pointerUp(const ToolContext &context)
    {
        if (!context.doc.hasActiveDrawing())
        {
            return;
        }

        TileLayer &activeLayer = context.doc.activeDrawing->getActiveLayer();
        int color = context.tools->getColorPickerTool().getColor();

        TileUndo tileUndo = TileUndo::createForActiveTileLayer(*context.doc.document, context.tools);

        Vec2Int bottomLeft = activeLayer.getTilePos(m_TempRectDrawer.getBounds().getBottomLeft());
        Vec2Int topRight = activeLayer.getTilePos(m_TempRectDrawer.getBounds().getTopRight());
        BoundsInt bounds(bottomLeft, topRight);

        if (m_IsFilled)
        {
            draw_filled_rect(
                activeLayer,
                bounds,
                color,
                [&](std::shared_ptr<Rect2D> prev, std::shared_ptr<Rect2D> next) { tileUndo.addTile(prev, next); });
        }
        else
        {
            draw_outlined_rect(
                activeLayer,
                m_TempRectDrawer.getBounds(),
                color,
                [&](std::shared_ptr<Rect2D> prev, std::shared_ptr<Rect2D> next) { tileUndo.addTile(prev, next); });
        }

        context.doc.document->getHistory()->add(std::make_shared<TileUndo>(tileUndo));
        getCursor()->destroy(context.doc.activeDrawing->getToolLayer());
        context.doc.activeDrawing->getToolLayer().clear();
        m_TempRectDrawer.reset();
    }

    void RectangleTool::pointerMove(const ToolContext &context)
    {
        if (!context.pointer.isDown || !context.doc.hasActiveDrawing())
        {
            return;
        }

        TileLayer &tileLayer = context.doc.activeDrawing->getToolLayer();

        if (m_IsFilled)
        {
            m_TempRectDrawer.drawFilled(tileLayer,
                                        context.pointer.down,
                                        context.pointer.curr,
                                        context.tools->getColorPickerTool().getColor());
        }
        else
        {
            m_TempRectDrawer.drawOutlined(tileLayer,
                                          context.pointer.down,
                                          context.pointer.curr,
                                          context.tools->getColorPickerTool().getColor());
        }
    }

    void RectangleTool::setFilled(bool isFilled)
    {
        m_IsFilled = isFilled;
    }

    bool RectangleTool::isFilled()
    {
        return m_IsFilled;
    }
} // namespace editor
} // namespace spright
