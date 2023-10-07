#include "./shear_tool.h"

#include "../../select_tool/select_tool.h"

namespace spright
{
namespace editor
{
    ShearTool::ShearTool() : Tool("shear")
    {
    }

    void ShearTool::execute(ToolContext &toolContext)
    {
        const BoundsInt &selectionBounds = toolContext.tools->getSelectTool().getSelectionBuffer().getTileBounds();

        TileLayer &activeLayer = toolContext.doc.activeDrawing->getActiveLayer();
        BoundsInt bounds = BoundsInt(selectionBounds.getBottomLeft(), selectionBounds.getTopRight());

        std::vector<int> newIndexes;

        if (m_IsHorizontal)
        {
            newIndexes = shear_horizontal(activeLayer, bounds, m_ShearInRad);
        }
        else
        {
            newIndexes = shear_vertical(activeLayer, bounds, m_ShearInRad);
        }

        toolContext.tools->getSelectTool().setSelection(newIndexes, *toolContext.doc.activeDrawing);
    }

    void ShearTool::setShearInRad(float rad)
    {
        m_ShearInRad = rad;
    }

    void ShearTool::setShearDirectionAsVertical()
    {
        m_IsHorizontal = false;
    }

    void ShearTool::setShearDirectionAsHorizontal()
    {
        m_IsHorizontal = true;
    }
} // namespace editor
} // namespace spright
