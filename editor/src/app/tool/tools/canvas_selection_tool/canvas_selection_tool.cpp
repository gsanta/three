#include "canvas_selection_tool.h"

namespace spright
{
namespace editor
{
    CanvasSelectionTool::CanvasSelectionTool() : Tool("canvas_selection")
    {
    }

    void CanvasSelectionTool::pointerDown(const ToolContext &context)
    {
        Document *document = context.doc.document;

        if (document->getActiveDrawing())
        {
            document->getActiveDrawing()->getDecorationLayer().clear();
        }

        for (size_t i = 0; i < document->getDrawings().size(); i++)
        {
            if (document->getDrawings()[i].getBounds().contains(context.pointer.curr.x, context.pointer.curr.y))
            {
                document->setActiveDrawing(i);
                break;
            }
        }

        Drawing *activeDrawing = document->getActiveDrawing();
        if (activeDrawing)
        {
            Bounds bounds = activeDrawing->getBounds();

            float minX = bounds.minX;
            float minY = bounds.minY;
            float maxX = bounds.maxX;
            float maxY = bounds.maxY;

            activeDrawing->getDecorationLayer().clear();

            Rect2D top(minX, maxY, maxX - minX, 0.2, COLOR_BLUE);
            Rect2D right(maxX, minY, 0.2, maxY - minY, COLOR_BLUE);
            Rect2D bottom(minX, minY - 0.2, maxX - minX, 0.2, COLOR_BLUE);
            Rect2D left(minX - 0.2, minY, 0.2, maxY - minY, COLOR_BLUE);

            activeDrawing->getDecorationLayer().add(top);
            activeDrawing->getDecorationLayer().add(right);
            activeDrawing->getDecorationLayer().add(bottom);
            activeDrawing->getDecorationLayer().add(left);
        }
    }
} // namespace editor
} // namespace spright
