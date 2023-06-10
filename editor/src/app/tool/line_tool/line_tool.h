#pragma once

#include "../brush.h"
#include "../tool/tool.h"

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
        void drawLine(Vec2 start, Vec2 end, int color, TileLayer &tileLayer, TileLayer &drawLayer);

    private:
        std::vector<Rect2D *> m_Rects;

        Brush m_Brush;
    };
} // namespace editor
} // namespace spright
