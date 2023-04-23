#include "paint_bucket_tool.h"

namespace spright
{
namespace editor
{

    PaintBucketTool::PaintBucketTool(Services *services) : m_Services(services), Tool("paint_bucket")
    {
    }

    void PaintBucketTool::pointerUp(const ToolContext &context)
    {
        if (!context.doc.hasActiveDrawing())
        {
            return;
        }

        TileLayer &tileLayer = context.doc.activeDrawing->getActiveLayer();
        Vec2Int tilePos = tileLayer.getTilePos(context.pointer.curr);

        m_FloodFill.floodFill(tileLayer, tilePos.x, tilePos.y, m_Services->getColorPalette()->color);
    }
} // namespace editor
} // namespace spright
