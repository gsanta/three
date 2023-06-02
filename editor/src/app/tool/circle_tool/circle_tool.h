#pragma once
#include "../brush.h"
#include "../paint_bucket/queue_linear_flood_fill.h"
#include "../tool/tool.h"

namespace spright
{
namespace editor
{
    class CircleTool : public Tool
    {
    public:
        CircleTool();

        void pointerMove(const ToolContext &) override;

        void pointerUp(const ToolContext &) override;

        void setFilled(bool isFilled);

    private:
        void drawCircle(BoundsInt &bounds, int color, TileLayer &layer);

        BoundsInt getCircleBounds(const ToolContext &, const TileLayer &);

    private:
        BoundsInt m_PrevCircleBounds;

        QueueLinearFloodFill m_FloodFill;

        bool m_IsFilled = false;
    };
} // namespace editor
} // namespace spright
