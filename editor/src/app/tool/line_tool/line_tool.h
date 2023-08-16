#pragma once

#include "../../core/history/document_history.h"
#include "../../core/history/tile_undo.h"
#include "../../utils/declarations.h"
#include "../brush.h"
#include "../common/rectangle_cursor/rectangle_cursor.h"
#include "../tool/tool.h"
#include "../tool/tool_context.h"

namespace spright
{
namespace editor
{
    class LineTool : public Tool
    {
    public:
        LineTool();

        void pointerMove(const ToolContext &toolContext) override;

        void pointerUp(const ToolContext &toolContext) override;

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
} // namespace editor
} // namespace spright
