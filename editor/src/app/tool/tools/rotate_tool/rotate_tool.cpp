#include "./rotate_tool.h"

namespace spright
{
namespace editor
{
    RotateTool::RotateTool() : Tool("shear")
    {
    }

    void RotateTool::execute(ToolContext &toolContext)
    {
        const BoundsInt &selectionBounds = toolContext.tool.selectionBuffer->getTileBounds();

        rotate(toolContext.doc.activeDrawing->getActiveLayer(),
               BoundsInt(selectionBounds.getBottomLeft(), selectionBounds.getTopRight()),
               1.5708f);
    }
} // namespace editor
} // namespace spright
