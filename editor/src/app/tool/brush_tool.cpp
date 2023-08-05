#include "brush_tool.h"

namespace spright
{
namespace editor
{

    BrushTool::BrushTool() : Tool("brush")
    {
    }

    void BrushTool::setSize(int size)
    {
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

        Drawing *drawing = context.doc.document->getDrawingAt(context.pointer.curr);

        if (drawing != nullptr)
        {
            TileLayer &layer = drawing->getActiveLayer();

            if (!isPointerMove)
            {
                context.doc.document->getHistory()->add(
                    std::make_shared<TileUndo>(TileUndo::createForActiveTileLayer(*context.doc.document)));
            }

            TileUndo *tileUndo = dynamic_cast<TileUndo *>(context.doc.document->getHistory()->peek());

            for (int i = 0; i < m_Size; i++)
            {
                for (int j = 0; j < m_Size; j++)
                {
                    Vec2Int tilePos = layer.getTilePos(context.pointer.curr);

                    brush.paint(layer,
                                tilePos,
                                getColor(),
                                [&](std::shared_ptr<Rect2D> prev, std::shared_ptr<Rect2D> next) {
                                    tileUndo->addTile(prev, next);
                                });
                }
            }
        }
    }
} // namespace editor
} // namespace spright
