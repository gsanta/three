#pragma once

#include "../../../history/document_history.h"
#include "../../../history/tile_undo.h"
#include "../../../utils/declarations.h"
#include "../../context/tool_context.h"
#include "../../cursor/rectangle_cursor/rectangle_cursor.h"
#include "../../tool.h"
#include "../../tools/brush_tool/brush.h"

namespace spright
{
namespace editing
{
    class LineTool : public PixelTool
    {
    public:
        LineTool();

        void pointerMove(const ToolContext &toolContext) override;

        void pointerUp(ToolContext &toolContext) override;

    private:
        void drawLine(Vec2 start,
                      Vec2 end,
                      int color,
                      TileLayer &tileLayer,
                      TileLayer &drawLayer,
                      TileUndo *tileUndo = nullptr);

    private:
        std::vector<Rect2D *> m_Rects;

        Brush m_Brush;
    };
} // namespace editing
} // namespace spright
