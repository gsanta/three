#include "./shear_tool.h"

namespace spright
{
namespace editor
{
    ShearTool::ShearTool() : Tool("shear")
    {
    }

    void ShearTool::execute(ToolContext &toolContext)
    {
        // SelectTool *selectTool = dynamic_cast<SelectTool *>(getTool("select"));

        const BoundsInt &selectionBounds = toolContext.tool.selectionBuffer->getTileBounds();

        std::vector<int> newIndexes =
            shear_horizontal(toolContext.doc.activeDrawing->getActiveLayer(),
                             BoundsInt(selectionBounds.getBottomLeft(), selectionBounds.getTopRight()),
                             0.436332f);

        toolContext.tool.selectionBuffer->setTileIndexes(newIndexes, toolContext.doc.activeDrawing->getActiveLayer());

        toolContext.tools->getSelectTool().setSelection(newIndexes, *toolContext.doc.activeDrawing);
    }
} // namespace editor
} // namespace spright
