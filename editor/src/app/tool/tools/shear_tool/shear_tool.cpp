#include "./shear_tool.h"

namespace spright
{
namespace editor
{

    void ShearTool::execute()
    {
        // SelectTool *selectTool = dynamic_cast<SelectTool *>(getTool("select"));

        // const BoundsInt &selectionBounds = selectTool->getSelectionBuffer()->getSelectionBounds();

        // std::vector<int> newIndexes =
        //     shear_horizontal(m_DocumentStore->getActiveDocument().getActiveLayer(),
        //                      BoundsInt(selectionBounds.getBottomLeft(), selectionBounds.getTopRight()),
        //                      0.436332f);
        // dynamic_cast<SelectTool *>(getTool("select"))
        //     ->setSelectedTiles(std::move(newIndexes),
        //                        m_DocumentStore->getActiveDocument().getActiveDrawing().getTempLayer());
    }
} // namespace editor
} // namespace spright
