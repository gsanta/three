#include "paint_bucket_tool.h"

#include "../color_picker_tool/color_picker_tool.h"

namespace spright
{
namespace editor
{

    PaintBucketTool::PaintBucketTool() : Tool("paint_bucket")
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

        TileUndo tileUndo = TileUndo::createForActiveTileLayer(*context.doc.document, context.tools);

        m_FloodFill.floodFill(
            tileLayer,
            tilePos.x,
            tilePos.y,
            context.tools->getColorPickerTool().getColor(),
            [&](std::shared_ptr<Rect2D> prev, std::shared_ptr<Rect2D> next) { tileUndo.addTile(prev, next); });

        context.doc.document->getHistory()->add(std::make_shared<TileUndo>(tileUndo));
    }
} // namespace editor
} // namespace spright
