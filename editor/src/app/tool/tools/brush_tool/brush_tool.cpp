#include "brush_tool.h"

#include "../color_picker_tool/color_picker_tool.h"

namespace spright
{
namespace editor
{

    BrushTool::BrushTool() : Tool("brush", std::make_shared<RectangleCursor>(1))
    {
    }

    void BrushTool::setSize(int size)
    {
        dynamic_cast<RectangleCursor*>(getCursor().get())->setSize(size);
        m_Size = size;
    }

    void BrushTool::pointerMove(const ToolContext &context)
    {
        if (context.pointer.isLeftButtonDown())
        {
            paint(context, true);
        }
    }

    void BrushTool::pointerDown(const ToolContext &context)
    {
        paint(context, false);
    }

    void BrushTool::paint(const ToolContext &context, bool isPointerMove)
    {
        Camera &camera = context.doc.document->getCamera();

        Vec2 center2D = camera.getCenter2D();

        float zoom = camera.getZoom();

        Drawing &drawing = context.doc.document->getActiveDrawing();

        TileLayer &layer = drawing.getActiveLayer();

        if (!isPointerMove)
        {
            context.doc.document->getHistory()->add(
                std::make_shared<TileUndo>(TileUndo::createForActiveTileLayer(*context.doc.document, context.tools)));
        }

        TileUndo *tileUndo = dynamic_cast<TileUndo *>(context.doc.document->getHistory()->peek());

        int half = m_Size / 2;
        int end = (m_Size - half);

        for (int i = -half; i < end; i++)
        {
            for (int j = -half; j < end; j++)
            {
                Vec2Int tilePos = layer.getTilePos(context.pointer.curr) + Vec2Int(i, j);

                brush.paint(
                    layer,
                    tilePos,
                    context.tools->getColorPickerTool().getColor(),
                    [&](std::shared_ptr<Rect2D> prev, std::shared_ptr<Rect2D> next) { tileUndo->addTile(prev, next); });
            }
        }

        if (tileUndo->isEmpty())
        {
            context.doc.document->getHistory()->pop();
        }
    }
} // namespace editor
} // namespace spright
